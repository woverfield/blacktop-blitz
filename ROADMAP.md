# Blacktop Blitz — Roadmap

> Rewritten June 2026. The previous version described a Next.js 14 + Supabase
> rewrite that was never built; this reflects what actually ships today.

## What it is
A fast NBA 2K Blacktop team randomizer/draft tool. Pick a game size and filters,
draft teams, compare them. Live at https://blacktopblitz.com.

## Actual architecture (June 2026)
- **Frontend:** React 18 + Vite, React Router, MUI, Framer Motion
- **Backend:** Convex (feedback, analytics events, site stats)
- **Player data:** static `public/players.json`, refreshed daily by
  `.github/workflows/sync-players.yml` from the [nba2kapi](https://github.com/woverfield/nba2kapi)
  `/api/players/bulk` endpoint — no API calls from end-user browsers
- **Hosting:** Vercel · **Analytics:** Vercel Analytics + custom Convex events

## Usage (Convex prod, June 2026)
| Metric | Value |
|--------|-------|
| Teams generated (`query_executed`) | 6,862 |
| Drafts started | 2,955 |
| Drafts completed | 3,315 |
| Players selected | 4,393 |
| Pageviews (30d) | 799 (305 uniques) |

Feb 2026 baseline was 6,210 teams / 3,105 drafts completed — steady growth.

## Health notes
- Player data is only as fresh as nba2kapi upstream. The daily sync "succeeds"
  even when upstream is stale, so freshness depends on the nba2kapi scraper
  staying healthy (fixed June 2026 — see that repo).
- `.env.local` references only the **dev** Convex deployment
  (`dapper-marmot-81`); the live site runs on a separate **prod** deployment.

## Possible next steps (not committed)
- **Shareable drafts** — permalink a generated matchup (high-leverage, cheap)
- **Filter presets / "surprise me"** — reduce friction on the main loop
- **Funnel polish** — `draft_abandoned` (967) vs completed (3,315): investigate
  where the ~25% who start but don't finish drop off
- **Roster freshness banner** — show "data as of <date>" from players.json
- **Finish PWA / installability** — a `public/manifest.json` already exists; add a service worker so it's truly installable (single-purpose tool people reopen)

## Design principles
1. Basketball-first, playground energy
2. Fast — the core loop is generate → draft → compare; keep it instant
3. Mobile-first; most traffic is `/` and `/qplay`
4. Delightful micro-interactions, never blocking
