/**
 * Load the daily-synced NBA 2K roster from blacktop's own CDN.
 *
 * Data lives at /public/players.json and is refreshed once a day by
 * .github/workflows/sync-players.yml, which hits nba2kapi's authenticated
 * /api/players/bulk endpoint. From the browser's perspective this is just
 * a same-origin static file fetch — no CORS, no API key, no per-user cost
 * against any rate limit.
 *
 * Filtering happens entirely client-side after the one-time JSON load.
 * The loaded array is cached for the page session, so back-to-back drafts
 * are instant.
 */

let cache = null;
let inflight = null;

async function loadAllPlayers() {
  if (cache) return cache;
  if (inflight) return inflight;

  inflight = fetch("/players.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to load /players.json (HTTP ${res.status})`);
      }
      return res.json();
    })
    .then((players) => {
      cache = players;
      inflight = null;
      return players;
    })
    .catch((err) => {
      inflight = null;
      throw err;
    });

  return inflight;
}

/**
 * Kick off the players.json fetch without awaiting it. Call from a top-level
 * mount so the JSON is in flight while the user fills out the draft form,
 * landing in cache by the time they submit.
 */
export function preloadPlayers() {
  loadAllPlayers().catch(() => {
    // Best-effort prefetch — fetchPlayers() will surface any real error.
  });
}

/**
 * Map a raw record from players.json to the shape blacktop's player cards
 * expect. Keeps PlayerCard / PlayerCardNoImage / TeamVersus unchanged.
 */
function normalize(p) {
  return {
    name: p.name,
    team: p.team,
    overall: p.overall,
    type: p.teamType,
    teamImg: p.teamImg,
    playerImg: p.playerImage,
    playerMisc: [...(p.positions || []), p.height].filter(Boolean),
  };
}

/**
 * Filter the full roster by the user's draft criteria.
 *
 * @param {Object} args
 * @param {string[]} args.teamTypes - subset of ["curr", "class", "allt"]
 * @param {number} [args.minRating]
 * @param {number} [args.maxRating]
 * @returns {Promise<Array>} matching players in blacktop's expected shape
 */
export async function fetchPlayers({ teamTypes, minRating, maxRating }) {
  if (!teamTypes || teamTypes.length === 0) return [];
  const all = await loadAllPlayers();
  const types = new Set(teamTypes);
  return all
    .filter(
      (p) =>
        types.has(p.teamType) &&
        (minRating == null || p.overall >= minRating) &&
        (maxRating == null || p.overall <= maxRating)
    )
    .map(normalize);
}
