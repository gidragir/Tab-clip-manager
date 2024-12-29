/** @type {import('vite').UserConfig} */

import { defineConfig } from "vite";
import defaultConfigs from "@repo/vite-config";

import path from "path";

const host = process.env.TAURI_DEV_HOST;

export default defineConfig(async () => {
  return {
    ...defaultConfigs,
    build: {
      rollupOptions: {
        input: {
          main: "src/windows/main/index.html",
          settings: "src/windows/settings/index.html",
        }
      },
    },
    // optimizeDeps: {
    //   include: ['@repo/ui'],
    // },
    server: {
      port: 1420,
      strictPort: true,
      host: host || false,
      hmr: host
        ? {
            protocol: "ws",
            host,
            port: 1421,
          }
        : undefined,
      watch: {
        // 3. tell vite to ignore watching `src-tauri`
        ignored: ["**/src-tauri/**"],
      },
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
    },
  };
});
