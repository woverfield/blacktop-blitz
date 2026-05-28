import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: "build", // keep CRA's output dir so Vercel project settings stay unchanged
  },
  // Vite only auto-exposes VITE_-prefixed env vars. To support the legacy
  // REACT_APP_CONVEX_URL Vercel env var during the migration window, we read
  // it from process.env (Vercel injects env vars there at build time —
  // loadEnv reads .env files on disk and would miss Vercel's injected vars)
  // and forward it via define, which does a build-time string replacement.
  // Remove this whole `define` block once the Vercel env var has been
  // renamed to VITE_CONVEX_URL.
  define: {
    "import.meta.env.REACT_APP_CONVEX_URL": JSON.stringify(
      process.env.REACT_APP_CONVEX_URL || ""
    ),
  },
});
