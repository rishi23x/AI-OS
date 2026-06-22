import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve("src"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve("."),
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
