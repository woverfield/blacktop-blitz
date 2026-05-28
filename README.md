# Blacktop Blitz

Blacktop Blitz is a React application designed to help NBA 2K players quickly generate and draft teams for the Blacktop game mode. Whether you're playing solo or with friends, Blacktop Blitz makes team creation fun, fast, and efficient.

Site: https://blacktopblitz.com/

## Features

- **Random Team Generation:** Generate random teams based on selected criteria.
- **Player Database:** Utilizes Web-Scraped NBA2k player data for accurate ratings and players.
- **Responsive Design:** Works seamlessly on desktop and mobile devices.

## Scripts

## Player Data

Player data lives in `public/players.json` and is refreshed automatically once a day by `.github/workflows/sync-players.yml`, which pulls from the [nba2kapi](https://github.com/woverfield/nba2kapi) `/api/players/bulk` endpoint. The frontend loads it as a same-origin static file — no API calls from end-user browsers.

**Force a manual sync:**
```bash
# from the Actions tab, or via CLI:
gh workflow run sync-players.yml
```

**Run the sync locally (rare — only needed if iterating on the sync script):**
```bash
NBA2KAPI_KEY="2k_..." node scripts/sync-players.mjs
```

## Installation

To run Blacktop Blitz locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/woverfield/blacktop-blitz.git
   ```

2. Navigate into the project directory:

   ```bash
   cd blacktop-blitz
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the application:

   ```bash
   npm start
   ```

5. Open your browser and visit `http://localhost:3000` to view Blacktop Blitz.

- NBA 2K for inspiring the Blacktop game mode.
- React and its vibrant community for providing excellent tools and libraries.

## Analytics

Usage tracking added February 2026. Events tracked: query filters, draft starts, player selections, completions, and abandonments.

**Baseline (Feb 2025 - Feb 2026):** ~3,100 unique visitors, ~5,500 drafts started.

## Screenshots
![image](https://github.com/user-attachments/assets/3c532960-4832-4b0f-b6d2-4a2d514f58fa)

![image](https://github.com/user-attachments/assets/2ba5a489-f881-4629-9ec5-9eb2af110dde)

