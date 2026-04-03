import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
});

// process.env.NODE_ENV === "production" ? "/charuhas10.github.io/" : "/",
