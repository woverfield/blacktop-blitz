# Blacktop Blitz - Technical Specification

## Database Schema (Supabase)

### Core Tables

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT auth.uid(),
    username TEXT UNIQUE NOT NULL,
    display_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    stats JSONB DEFAULT '{"drafts_completed": 0, "wins": 0, "favorite_player": null}'::jsonb,
    preferences JSONB DEFAULT '{"sound_enabled": true, "theme": "auto"}'::jsonb
);

-- Players table (cached from web scraping)
CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    external_id TEXT UNIQUE, -- ID from 2kratings
    name TEXT NOT NULL,
    team TEXT NOT NULL,
    overall INTEGER NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('curr', 'class', 'allt')),
    team_img TEXT,
    player_img TEXT,
    player_misc JSONB, -- positions, height, etc.
    stats JSONB, -- extended stats
    badges JSONB, -- special badges/abilities
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Drafts table
CREATE TABLE drafts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_code TEXT UNIQUE,
    host_id UUID REFERENCES users(id),
    status TEXT DEFAULT 'waiting' CHECK (status IN ('waiting', 'in_progress', 'completed', 'abandoned')),
    mode TEXT NOT NULL CHECK (mode IN ('single', 'multiplayer', 'tournament')),
    settings JSONB NOT NULL DEFAULT '{
        "team_size": 3,
        "timer_seconds": null,
        "min_overall": 70,
        "max_overall": 99,
        "player_types": ["curr", "class", "allt"]
    }'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Draft participants
CREATE TABLE draft_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    draft_id UUID REFERENCES drafts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    team_number INTEGER NOT NULL,
    is_ready BOOLEAN DEFAULT FALSE,
    final_team JSONB,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Draft picks (for history/replay)
CREATE TABLE draft_picks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    draft_id UUID REFERENCES drafts(id) ON DELETE CASCADE,
    participant_id UUID REFERENCES draft_participants(id),
    round_number INTEGER NOT NULL,
    pick_number INTEGER NOT NULL,
    player_id INTEGER REFERENCES players(id),
    options_presented JSONB NOT NULL, -- array of player IDs that were options
    picked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Saved teams
CREATE TABLE saved_teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    name TEXT NOT NULL,
    team_data JSONB NOT NULL,
    tags TEXT[],
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Challenges
CREATE TABLE challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    criteria JSONB NOT NULL, -- e.g., {"max_overall_avg": 85, "required_positions": ["PG", "C"]}
    reward_type TEXT,
    reward_data JSONB,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Challenge completions
CREATE TABLE challenge_completions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    challenge_id UUID REFERENCES challenges(id),
    user_id UUID REFERENCES users(id),
    draft_id UUID REFERENCES drafts(id),
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(challenge_id, user_id)
);

-- Leaderboards (materialized view, refreshed periodically)
CREATE MATERIALIZED VIEW leaderboards AS
SELECT 
    u.id,
    u.username,
    u.display_name,
    u.avatar_url,
    COUNT(DISTINCT d.id) as total_drafts,
    COUNT(DISTINCT CASE WHEN d.mode = 'multiplayer' THEN d.id END) as multiplayer_drafts,
    COUNT(DISTINCT cc.id) as challenges_completed,
    (u.stats->>'wins')::INTEGER as wins,
    RANK() OVER (ORDER BY COUNT(DISTINCT d.id) DESC) as drafts_rank,
    RANK() OVER (ORDER BY (u.stats->>'wins')::INTEGER DESC) as wins_rank
FROM users u
LEFT JOIN draft_participants dp ON u.id = dp.user_id
LEFT JOIN drafts d ON dp.draft_id = d.id AND d.status = 'completed'
LEFT JOIN challenge_completions cc ON u.id = cc.user_id
GROUP BY u.id, u.username, u.display_name, u.avatar_url, u.stats;
```

### Row Level Security (RLS) Policies

```sql
-- Users can read all profiles but only update their own
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY users_read ON users FOR SELECT USING (true);
CREATE POLICY users_update ON users FOR UPDATE USING (auth.uid() = id);

-- Drafts are readable by participants
ALTER TABLE drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY drafts_read ON drafts FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM draft_participants 
        WHERE draft_id = drafts.id AND user_id = auth.uid()
    ) OR status = 'waiting'
);

-- Saved teams are private unless explicitly public
ALTER TABLE saved_teams ENABLE ROW LEVEL SECURITY;
CREATE POLICY saved_teams_read ON saved_teams FOR SELECT USING (
    user_id = auth.uid() OR is_public = true
);
```

## API Endpoints (Next.js API Routes)

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/session` - Get current session

### Players
- `GET /api/players` - Get all players (paginated, filtered)
- `GET /api/players/:id` - Get specific player
- `POST /api/players/sync` - Trigger player data sync (admin only)
- `GET /api/players/search` - Search players by name

### Drafts
- `POST /api/drafts` - Create new draft
- `GET /api/drafts/:id` - Get draft details
- `POST /api/drafts/:id/join` - Join draft
- `POST /api/drafts/:id/ready` - Mark ready
- `POST /api/drafts/:id/pick` - Make a pick
- `GET /api/drafts/:id/replay` - Get draft replay data

### Teams
- `GET /api/teams` - Get user's saved teams
- `POST /api/teams` - Save a team
- `DELETE /api/teams/:id` - Delete saved team
- `GET /api/teams/public` - Get public teams

### Challenges
- `GET /api/challenges/active` - Get active challenges
- `POST /api/challenges/:id/complete` - Submit challenge completion

### Leaderboards
- `GET /api/leaderboards` - Get leaderboard data
- `GET /api/leaderboards/friends` - Get friends leaderboard

## Real-time Subscriptions

### Draft Room Events
```typescript
// Subscribe to draft updates
supabase
  .channel(`draft:${draftId}`)
  .on('broadcast', { event: 'player_joined' }, handlePlayerJoined)
  .on('broadcast', { event: 'player_ready' }, handlePlayerReady)
  .on('broadcast', { event: 'draft_started' }, handleDraftStarted)
  .on('broadcast', { event: 'pick_made' }, handlePickMade)
  .on('broadcast', { event: 'draft_completed' }, handleDraftCompleted)
  .subscribe();
```

## State Management (Zustand)

```typescript
interface AppState {
  // User
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Draft
  currentDraft: Draft | null;
  draftParticipants: DraftParticipant[];
  currentRound: number;
  currentOptions: Player[];
  
  // UI
  soundEnabled: boolean;
  theme: 'light' | 'dark' | 'auto';
  courtTheme: 'day' | 'sunset' | 'night';
  
  // Actions
  createDraft: (settings: DraftSettings) => Promise<Draft>;
  joinDraft: (roomCode: string) => Promise<void>;
  makePick: (playerId: number) => Promise<void>;
}
```

## Performance Requirements

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Loading Strategy
1. **Initial Load**: Critical CSS + minimal JS
2. **Progressive Enhancement**: Load 3D effects after interaction
3. **Image Loading**: Lazy load with blur-up placeholders
4. **Code Splitting**: Route-based + component-based splitting

### Caching Strategy
- **Player Data**: Cache in IndexedDB, update weekly
- **Images**: Service Worker cache with network fallback
- **API Responses**: SWR with 5-minute cache
- **Static Assets**: Immutable cache headers

## Security Considerations

1. **Authentication**: Supabase Auth with JWT tokens
2. **Authorization**: RLS policies on all tables
3. **Input Validation**: Zod schemas for all inputs
4. **Rate Limiting**: API route middleware
5. **CORS**: Strict origin policies
6. **Content Security Policy**: Restrictive CSP headers

## Error Handling

```typescript
// Global error boundary
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to Sentry
    // Show user-friendly error
    // Offer recovery action
  }
}

// API error handling
try {
  const data = await fetchWithRetry('/api/endpoint', {
    retries: 3,
    retryDelay: 1000
  });
} catch (error) {
  if (error.status === 429) {
    // Handle rate limit
  } else if (error.status === 401) {
    // Handle auth error
  } else {
    // Generic error handling
  }
}
```

## Testing Strategy

### Unit Tests (Vitest)
- Component logic
- Utility functions
- State management
- API route handlers

### Integration Tests (Playwright)
- User flows
- Real-time features
- Payment flows
- Cross-browser compatibility

### Performance Tests
- Lighthouse CI
- Bundle size monitoring
- Load testing with k6

## Deployment Pipeline

1. **Development**: Feature branches → Vercel preview
2. **Staging**: Main branch → staging.blacktopblitz.com
3. **Production**: Tagged releases → blacktopblitz.com

### CI/CD Steps
1. Run linter (ESLint)
2. Run type checker (TypeScript)
3. Run tests
4. Build application
5. Run Lighthouse CI
6. Deploy to Vercel
7. Run smoke tests
8. Notify team

---

*Last Updated: 2025-08-15*
*Version: 1.0*