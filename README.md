# Blacktop Blitz

Blacktop Blitz is a React application designed to help NBA 2K players quickly generate and draft teams for the Blacktop game mode. Whether you're playing solo or with friends, Blacktop Blitz makes team creation fun, fast, and efficient.

Site: https://blacktopblitz.com/

## Features

- **Random Team Generation:** Generate random teams based on selected criteria.
- **Player Database:** Utilizes Web-Scraped NBA2k player data for accurate ratings and players.
- **Responsive Design:** Works seamlessly on desktop and mobile devices.

## Scripts

There are some web scraping scripts that I made to get player data: https://github.com/woverfield/2k-web-scraping. I also included the files in this repo alongside with some other scripts to update the players and combine the 3 rosters (current, classic, all-time) into one json file.

## Updating Player Data

The player data is scraped from https://www.2kratings.com/ using scripts in [2k-web-scraping](https://github.com/woverfield/2k-web-scraping).

**Requirements:**  
- [Node.js](https://nodejs.org/)  
- [Playwright](https://playwright.dev/)

**How to update:**
1. In the 2k-web-scraping directory, run:
   ```bash
   npm install playwright
   node allt.js > alltplayers.json
   node class.js > classplayers.json
   node curr.js > currplayers.json
   ```
2. Copy the resulting JSON files into `blacktop-blitz/src/data/`.
3. In the blacktop-blitz directory, run:
   ```bash
   node src/scripts/combineRosters.js
   ```
   This will generate a combined `players.json` file for use in the app.

**Note:**  
The scraping scripts now output only clean JSON (no debug logs), and require a visible browser window (`headless: false`) to bypass bot protection.

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

## Screenshots
![image](https://github.com/user-attachments/assets/3c532960-4832-4b0f-b6d2-4a2d514f58fa)

![image](https://github.com/user-attachments/assets/2ba5a489-f881-4629-9ec5-9eb2af110dde)

