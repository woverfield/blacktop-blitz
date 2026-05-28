import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

// Read the Convex URL from either VITE_CONVEX_URL (post-Vite-migration) or
// REACT_APP_CONVEX_URL (legacy CRA name). Vite only inlines env vars matching
// its prefix list, so REACT_APP_* must be exposed in vite.config.mjs's `define`.
// This dual-read avoids downtime during the Vercel env-var rename.
const convexUrl =
  import.meta.env.VITE_CONVEX_URL || import.meta.env.REACT_APP_CONVEX_URL;
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {convex ? (
      <ConvexProvider client={convex}>
        <Analytics />
        <SpeedInsights />
        <App />
      </ConvexProvider>
    ) : (
      <>
        <Analytics />
        <SpeedInsights />
        <App />
      </>
    )}
  </React.StrictMode>
);
