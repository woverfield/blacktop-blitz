/**
 * Client for the nba2kapi public endpoint.
 *
 * No API key. The endpoint is public, rate-limited by IP (60 req/min).
 * Browser-shipped keys get extracted and abused — do NOT add an env var
 * for a key, do NOT send X-API-Key. If you need higher limits, that
 * requires a backend, which we don't have at blacktop's traffic.
 *
 * Caching: server returns ETag + Cache-Control: public, max-age=3600.
 * We cache the body keyed by request URL in sessionStorage and echo the
 * ETag as If-None-Match on repeat requests — server returns 304 with
 * empty body and we return the cached payload.
 */

const BASE = "https://api.nba2kapi.com/api/public/players";
const PAGE_LIMIT = 100;
const MAX_PAGES = 5; // hard cap at 500 players per teamType, plenty for randomization

export class RateLimitError extends Error {
  constructor(retryAfter, resetAt) {
    super(`Rate limited. Try again in ${retryAfter}s.`);
    this.name = "RateLimitError";
    this.retryAfter = retryAfter;
    this.resetAt = resetAt;
  }
}

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function cacheKey(url) {
  return `nba2kapi:${url}`;
}

function loadCache(url) {
  try {
    const raw = sessionStorage.getItem(cacheKey(url));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveCache(url, etag, body) {
  try {
    sessionStorage.setItem(cacheKey(url), JSON.stringify({ etag, body }));
  } catch {
    // sessionStorage may be full or disabled (private mode) — caching is best-effort
  }
}

function buildUrl({ teamType, minRating, maxRating, position, limit, cursor }) {
  const params = new URLSearchParams();
  if (teamType) params.set("teamType", teamType);
  if (minRating != null) params.set("minRating", String(minRating));
  if (maxRating != null) params.set("maxRating", String(maxRating));
  if (position) params.set("position", position);
  if (limit != null) params.set("limit", String(limit));
  if (cursor) params.set("cursor", cursor);
  return `${BASE}?${params.toString()}`;
}

async function fetchPage(url) {
  const cached = loadCache(url);
  const headers = {};
  if (cached?.etag) headers["If-None-Match"] = cached.etag;

  const res = await fetch(url, { headers });

  if (res.status === 304 && cached) {
    return cached.body;
  }

  if (res.status === 429) {
    const retryAfter = parseInt(res.headers.get("Retry-After") || "60", 10);
    const resetAt = res.headers.get("X-RateLimit-Reset");
    throw new RateLimitError(retryAfter, resetAt);
  }

  if (!res.ok) {
    throw new ApiError(`API request failed (${res.status})`, res.status);
  }

  const body = await res.json();
  const etag = res.headers.get("ETag");
  if (etag) saveCache(url, etag, body);

  return body;
}

async function fetchAllForType(filters) {
  const all = [];
  let cursor;
  for (let page = 0; page < MAX_PAGES; page++) {
    const url = buildUrl({ ...filters, limit: PAGE_LIMIT, cursor });
    const body = await fetchPage(url);
    if (!body.success) {
      throw new ApiError(body.error?.message || "Unknown API error", 500);
    }
    all.push(...body.data);
    const pagination = body.meta?.pagination;
    if (!pagination?.hasMore || !pagination.nextCursor) break;
    cursor = pagination.nextCursor;
  }
  return all;
}

/**
 * Map an API player record to the shape blacktop's existing components expect.
 * Keeps PlayerCard, PlayerCardNoImage, PlayerOptions, and TeamVersus unchanged.
 */
function normalize(p) {
  return {
    name: p.name,
    slug: p.slug,
    team: p.team,
    overall: p.overall,
    type: p.teamType,
    teamImg: p.teamImg,
    playerImg: p.playerImage,
    playerMisc: [...(p.positions || []), p.height].filter(Boolean),
  };
}

/**
 * Fetch players matching the user's draft filters.
 *
 * Server doesn't OR across teamTypes, so multi-type queries fan out into
 * parallel requests and merge client-side.
 *
 * @param {Object} args
 * @param {string[]} args.teamTypes - subset of ["curr", "class", "allt"]
 * @param {number} [args.minRating]
 * @param {number} [args.maxRating]
 * @param {string} [args.position]
 * @returns {Promise<Array>} normalized players sorted by overall desc
 */
export async function fetchPlayers({ teamTypes, minRating, maxRating, position }) {
  if (!teamTypes || teamTypes.length === 0) return [];

  const perType = await Promise.all(
    teamTypes.map((teamType) =>
      fetchAllForType({ teamType, minRating, maxRating, position })
    )
  );

  // Dedupe by slug + team — a player can legitimately appear across teamTypes
  // as different roster variants (e.g. current Wemby vs. all-time Spurs Wemby),
  // and we want to keep both as separate draft options.
  const seen = new Set();
  const merged = [];
  for (const p of perType.flat()) {
    const key = `${p.slug || p.name}::${p.team}`;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(p);
  }

  merged.sort((a, b) => b.overall - a.overall);
  return merged.map(normalize);
}
