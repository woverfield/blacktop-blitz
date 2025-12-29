import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convexUrl = process.env.REACT_APP_CONVEX_URL;
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
