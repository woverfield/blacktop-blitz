# Blacktop Blitz - UI/UX Design System

## 🎨 Visual Theme: Street Basketball Culture

### Core Concept
Transform the digital experience into an immersive street basketball environment where every interaction feels like you're on the blacktop court.

## 🎯 Design Principles

1. **Authenticity**: Every element should feel genuine to basketball culture
2. **Energy**: High-impact visuals that match the excitement of the game
3. **Accessibility**: Bold, clear design that works for everyone
4. **Performance**: Beautiful but lightweight animations
5. **Delight**: Surprise users with unexpected details

## 🏀 The Virtual Court

### Layout Structure
```
┌─────────────────────────────────────┐
│          SKY/BACKDROP               │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │      BASKETBALL COURT       │   │
│  │     (3D Perspective)        │   │
│  │                             │   │
│  │  [Player Cards Appear Here] │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│         UI CONTROLS                 │
└─────────────────────────────────────┘
```

### Court Themes

#### Day Court (Default)
- Bright blue sky with subtle clouds
- Sun rays casting shadows
- Concrete texture with chalk marks
- Chain-link fence in background
- Ambient: Birds, distant traffic

#### Sunset Court
- Orange/pink gradient sky
- Long shadows across court
- Golden hour lighting on cards
- Silhouetted cityscape
- Ambient: Evening crickets, basketball echoes

#### Night Court
- Dark sky with city lights
- Court lit by overhead lights
- Neon accents on UI elements
- Light halos around player cards
- Ambient: City nightlife, hip-hop beats

## 🃏 Player Card Design

### Card States

#### Base Card
```
┌─────────────────┐
│ ┌─┐ TEAM LOGO   │
│ │##│            │
│ └─┘             │
│                 │
│  PLAYER IMAGE   │
│                 │
│ ┌─────────────┐ │
│ │NAME         │ │
│ │POS | HEIGHT │ │
│ │TEAM         │ │
│ └─────────────┘ │
└─────────────────┘
```

### Card Tiers & Effects

#### Bronze (60-69)
- Matte brown border
- Subtle grain texture
- No special effects

#### Silver (70-74)
- Metallic silver sheen
- Slight reflection effect
- Soft glow on hover

#### Gold (75-79)
- Gold foil border
- Shimmer animation
- Sparkle particles on select

#### Emerald (80-83)
- Green crystalline border
- Refraction effect
- Energy pulses

#### Sapphire (84-86)
- Blue gem-like border
- Water ripple effect
- Cool aura glow

#### Ruby (87-89)
- Red jewel border
- Fire particle effects
- Heat distortion on hover

#### Amethyst (90-91)
- Purple crystal border
- Mystic smoke effect
- Power surge animation

#### Diamond (92-94)
- Prismatic rainbow refraction
- Blinding shine on reveal
- Rotation shows different colors

#### Pink Diamond (95-96)
- Rare pink shimmer
- Holographic effect
- Reality distortion field

#### Galaxy Opal (97-98)
- Swirling galaxy inside border
- Stars and nebula effects
- Card seems to contain universe

#### Dark Matter (99)
- Void-like black with purple energy
- Reality tears around edges
- Gravitational lensing effect

### Card Animations

#### Hover State
```javascript
onHover: {
  scale: 1.05,
  rotateY: 5deg,
  rotateX: -5deg,
  transition: spring(0.4, 0.8)
}
```

#### Selection Animation
1. Card lifts up (translateZ)
2. Glow intensifies
3. Particle burst
4. Sound: "Swoosh" + tier-specific sound

#### Pack Opening (Future Feature)
1. Pack appears with physics
2. Tear animation
3. Cards fly out with motion blur
4. Highest tier card has special reveal

## 🎵 Sound Design

### UI Sounds

#### Navigation
- **Menu Open**: Basketball bounce (0.2s)
- **Button Hover**: Sneaker squeak (0.1s)
- **Button Click**: Ball hitting rim (0.3s)
- **Page Transition**: Crowd "ohh" (0.5s)

#### Draft Sounds
- **Timer Tick**: Metronome click
- **Timer Warning**: Faster ticks + heartbeat
- **Pick Made**: Net swish + crowd cheer
- **Opponent Pick**: Defensive grunt
- **Round Complete**: Whistle blow

#### Card Interactions
- **Bronze-Gold**: Simple whoosh
- **Emerald-Ruby**: Magical chime
- **Amethyst-Diamond**: Power up sound
- **Pink Diamond+**: Epic orchestral hit

### Ambient Soundscapes
- **Court Ambience**: 2-3 minute loops
- **Dynamic Mixing**: Reacts to user actions
- **Spatial Audio**: 3D positioned sounds

## 🎭 Micro-interactions

### Loading States
- **Bouncing Basketball**: Dribbling animation
- **Spinning Ball**: On network requests
- **Court Lines Drawing**: For initial load
- **Player Silhouettes**: Filling in progressively

### Success States
- **Confetti Burst**: Completion celebrations
- **Scoreboard Flash**: Big number displays
- **Trophy Spin**: Achievement unlocked
- **Court Eruption**: Exceptional drafts

### Easter Eggs
- **Kobe Bryant**: Special purple/gold animation
- **Michael Jordan**: Bulls logo flames
- **LeBron James**: Crown appears briefly
- **Rare Combos**: Secret animations for specific team combinations

## 🎨 Color System

### Primary Palette
```scss
// Court Colors
$court-concrete: #8B8680;
$court-lines: #FFFFFF;
$court-key: #E85D00;

// Sky Gradients
$sky-day: linear-gradient(#87CEEB, #98D8E8);
$sky-sunset: linear-gradient(#FF6B6B, #4ECDC4);
$sky-night: linear-gradient(#0F0C29, #24243e);

// UI Colors
$primary: #FF6B00;      // Basketball orange
$secondary: #1E1E1E;    // Court black
$accent: #FFD700;       // Trophy gold
$success: #00C851;      // Go green
$danger: #FF4444;       // Foul red
```

### Typography
```scss
// Headers
$font-display: 'Bebas Neue', sans-serif;  // Bold, athletic
$font-body: 'Inter', sans-serif;          // Clean, readable

// Sizes
$text-xs: 0.75rem;    // 12px
$text-sm: 0.875rem;   // 14px
$text-base: 1rem;     // 16px
$text-lg: 1.125rem;   // 18px
$text-xl: 1.25rem;    // 20px
$text-2xl: 1.5rem;    // 24px
$text-3xl: 1.875rem;  // 30px
$text-4xl: 2.25rem;   // 36px
$text-5xl: 3rem;      // 48px
```

## 📱 Responsive Behavior

### Mobile First Design
- **Portrait**: Single column card layout
- **Landscape**: Two column with court view
- **Tablet**: Full court with side panels
- **Desktop**: Immersive 3D experience

### Touch Interactions
- **Swipe**: Navigate between cards
- **Long Press**: Preview player stats
- **Pinch**: Zoom court view
- **Drag**: Reorder saved teams

## 🎬 Page Transitions

### Route Animations
```typescript
const pageVariants = {
  initial: { opacity: 0, x: -200 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 200 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};
```

### Special Transitions
- **Home → Draft**: Court materializes from logo
- **Draft → Results**: Cards fly to final positions
- **Results → Home**: Celebration then fade

## 🏆 Achievement Animations

### Unlock Sequence
1. Screen dims except achievement
2. Trophy/badge materializes with particles
3. Text types out with sound
4. Fireworks in team colors
5. Option to share

### Rarity Levels
- **Common**: Simple pop-in
- **Rare**: Spin and glow
- **Epic**: Lightning effects
- **Legendary**: Full screen takeover

## 🎮 Interactive Elements

### 3D Court Camera
- **Orbit Controls**: Mouse/touch to rotate
- **Zoom Levels**: 3 preset positions
- **Auto-rotate**: When idle
- **Focus Mode**: Zoom to active area

### Physics-Based UI
- **Card Stack**: Realistic card physics
- **Ball Bounce**: Follows real physics
- **Confetti**: Particle system with gravity
- **Cloth Simulation**: Banners and flags

## 📊 Data Visualization

### Team Stats Display
- **Radar Charts**: Animated build-up
- **Bar Graphs**: Bouncing bars
- **Heat Maps**: Position strengths
- **Comparison Mode**: Side-by-side morphing

### Historical Data
- **Timeline Scrubber**: Through seasons
- **Performance Graphs**: Smooth curves
- **Achievement Progress**: Filling meters

## ♿ Accessibility Features

### Visual
- **High Contrast Mode**: For visibility
- **Reduced Motion**: Simpler animations
- **Color Blind Modes**: Alternative palettes
- **Text Size Options**: 3 levels

### Audio
- **Sound Toggle**: Global on/off
- **Volume Sliders**: By category
- **Visual Sound Cues**: For deaf users
- **Screen Reader**: Full support

### Controls
- **Keyboard Navigation**: Full support
- **Focus Indicators**: Clear and visible
- **Skip Links**: For navigation
- **Touch Targets**: Minimum 44x44px

## 🔄 Animation Timing

### Durations
- **Instant**: 0-100ms (hover states)
- **Fast**: 200-300ms (micro-interactions)
- **Normal**: 400-600ms (page transitions)
- **Slow**: 800-1200ms (celebrations)

### Easing Functions
```scss
$ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
$ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
$ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);
```

---

*Last Updated: 2025-08-15*
*Version: 1.0*