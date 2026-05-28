import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Vite only auto-exposes VITE_-prefixed env vars. To support the legacy
  // REACT_APP_CONVEX_URL Vercel env var during the migration window, we
  // explicitly load and forward it. Remove this whole `define` block once
  // the Vercel env var has been renamed to VITE_CONVEX_URL.
  const env = loadEnv(mode, process.cwd(), ["REACT_APP_"]);
  return {
    plugins: [react()],
    server: {
      port: 3000,
    },
    build: {
      outDir: "build", // keep CRA's output dir so Vercel project settings stay unchanged
    },
    define: {
      "import.meta.env.REACT_APP_CONVEX_URL": JSON.stringify(
        env.REACT_APP_CONVEX_URL || ""
      ),
    },
  };
});
