#!/usr/bin/env node
/**
 * Daily sync of the NBA 2K roster from nba2kapi → public/players.json.
 *
 * Run by .github/workflows/sync-players.yml on a daily cron. Hits the
 * authenticated /api/players/bulk endpoint once and writes a trimmed
 * static file the React app loads from blacktop's own CDN.
 *
 * Bandwidth optimization: stores the last response's ETag in
 * .github/state/players.etag and sends it as If-None-Match on the next
 * run. ~80% of days return 304 with an empty body since the underlying
 * data is scraped biweekly.
 *
 * Run locally:
 *   NBA2KAPI_KEY="2k_..." node scripts/sync-players.mjs
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const API_URL = "https://api.nba2kapi.com/api/players/bulk";
const OUT_FILE = "public/players.json";
const ETAG_FILE = ".github/state/players.etag";

const KEY = process.env.NBA2KAPI_KEY;
if (!KEY) {
  console.error("ERROR: NBA2KAPI_KEY env var not set.");
  console.error("Locally: NBA2KAPI_KEY=\"2k_...\" node scripts/sync-players.mjs");
  console.error("CI: configured as a repository secret of the same name.");
  process.exit(1);
}

let previousEtag = null;
if (existsSync(ETAG_FILE)) {
  previousEtag = readFileSync(ETAG_FILE, "utf8").trim();
  console.log(`Previous ETag: ${previousEtag}`);
}

const headers = { "X-API-Key": KEY };
if (previousEtag) headers["If-None-Match"] = previousEtag;

console.log(`Fetching ${API_URL}...`);
const res = await fetch(API_URL, { headers });

if (res.status === 304) {
  console.log("✓ 304 Not Modified — roster unchanged since last sync. Done.");
  process.exit(0);
}

if (!res.ok) {
  console.error(`API request failed: HTTP ${res.status}`);
  // Don't log the raw response body — if the upstream ever echoes the API key
  // (rare but seen in poorly-designed services), GitHub's secret masking only
  // catches exact string matches and would miss URL-encoded or partial echoes.
  console.error("Response body suppressed to avoid leaking secrets in CI logs.");
  process.exit(1);
}

const body = await res.json();
if (!body.success || !Array.isArray(body.data)) {
  console.error("Unexpected API response shape:", body);
  process.exit(1);
}

console.log(`✓ Fetched ${body.data.length} players`);

// Sanity floor — if the upstream ever returns a much smaller roster than
// expected (data outage, partial scrape, schema regression), bail before
// clobbering the live file. Current roster is ~1,872 players across all
// teamTypes; 500 is well below that floor but well above any single teamType.
const MIN_EXPECTED = 500;
if (body.data.length < MIN_EXPECTED) {
  console.error(
    `Suspiciously small roster (${body.data.length} < ${MIN_EXPECTED} expected). ` +
      `Refusing to overwrite ${OUT_FILE}. Investigate the upstream API before forcing a sync.`
  );
  process.exit(1);
}

// Trim each player to the fields blacktop's player cards use. If new card
// features need extra fields (e.g. attributes for stat filters), extend the
// projection here and the next sync will regenerate the static file.
const trimmed = body.data
  .map((p) => ({
    name: p.name,
    team: p.team,
    teamType: p.teamType,
    overall: p.overall,
    teamImg: p.teamImg,
    playerImage: p.playerImage,
    positions: p.positions || [],
    height: p.height || null,
  }))
  // Stable sort for deterministic file output → no spurious diffs.
  .sort((a, b) => b.overall - a.overall || a.name.localeCompare(b.name));

const json = JSON.stringify(trimmed, null, 2) + "\n";
writeFileSync(OUT_FILE, json);
console.log(`✓ Wrote ${trimmed.length} players to ${OUT_FILE} (${Math.round(json.length / 1024)} KB raw)`);

const etag = res.headers.get("etag");
if (etag) {
  mkdirSync(dirname(ETAG_FILE), { recursive: true });
  writeFileSync(ETAG_FILE, etag + "\n");
  console.log(`✓ Saved ETag to ${ETAG_FILE}`);
}
