import path from "node:path"
import react from "@vitejs/plugin-react-swc"
import tailwindcss from "@tailwindcss/vite"

import { defineConfig } from "vite"
import { tanstackRouter } from "@tanstack/router-plugin/vite"
import { lingui } from "@lingui/vite-plugin"

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      checks: {
        pluginTimings: false,
      },
    },
  },
  plugins: [
    tailwindcss(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      generatedRouteTree: "./src/route-tree.gen.ts",
      routesDirectory: "./src/pages",
      routeToken: "layout",
      quoteStyle: "double",
    }),
    react({
      plugins: [["@lingui/swc-plugin", {}]],
    }),
    lingui(),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
