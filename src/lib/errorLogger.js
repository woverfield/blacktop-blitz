/**
 * Lightweight client error reporting.
 *
 * The ErrorBoundary only catches render-phase throws. The "shows the teams for
 * a second then turns black" bug was device-specific (likely iOS Safari) and
 * could be in an async path the boundary never sees — a framer-motion animation
 * tick, an event handler, or a Convex callback. Without capturing those, we're
 * blind to whether the boundary actually fixed anything.
 *
 * This logs uncaught errors + unhandled rejections (and React boundary catches)
 * to Convex via the EXISTING analytics.trackEvent mutation — no backend change
 * needed: the error payload rides in metadata.queryParams (an optional string
 * the mutation already accepts). Query them later as eventType "client_error".
 *
 * Everything here is fire-and-forget and wrapped so the logger can never itself
 * throw or block the page.
 */
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";

const convexUrl =
  import.meta.env.VITE_CONVEX_URL || import.meta.env.REACT_APP_CONVEX_URL;
const client = convexUrl ? new ConvexHttpClient(convexUrl) : null;

let lastSignature = "";
let sent = 0;
const MAX_PER_SESSION = 20; // avoid flooding on a render-loop crash

export function reportError(source, error, extra = {}) {
  try {
    if (!client || sent >= MAX_PER_SESSION) return;

    const message =
      (error && (error.message || String(error))) || "unknown error";
    const signature = `${source}:${message}`;
    if (signature === lastSignature) return; // dedupe identical consecutive
    lastSignature = signature;
    sent += 1;

    const payload = JSON.stringify({
      source,
      message,
      stack: error && error.stack ? String(error.stack).slice(0, 1200) : "",
      ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
      path: typeof location !== "undefined" ? location.pathname : "",
      ...extra,
    }).slice(0, 4000);

    // Fire-and-forget; swallow any transport error.
    client
      .mutation(api.analytics.trackEvent, {
        eventType: "client_error",
        metadata: { queryParams: payload },
      })
      .catch(() => {});
  } catch {
    // The logger must never throw.
  }
}

export function installGlobalErrorLogging() {
  if (typeof window === "undefined") return;
  window.addEventListener("error", (e) => {
    reportError("window.onerror", e.error || { message: e.message }, {
      file: e.filename,
      line: e.lineno,
      col: e.colno,
    });
  });
  window.addEventListener("unhandledrejection", (e) => {
    reportError("unhandledrejection", e.reason || { message: "rejection" });
  });
}
