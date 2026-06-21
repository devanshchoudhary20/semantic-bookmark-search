import react from "@vitejs/plugin-react"
import { resolve } from "node:path"
import { defineConfig } from "vite"
import { viteStaticCopy } from "vite-plugin-static-copy"

// Plain Vite build for an MV3 extension. Unlike Parcel, Vite preserves runtime
// dynamic import() as native — required for onnxruntime-web to load its local WASM.
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: "manifest.json", dest: "." },
        { src: "ort-runtime/*", dest: "ort" },
        { src: "models", dest: "." },
        { src: "assets/icon.png", dest: "." }
      ]
    })
  ],
  resolve: {
    // Match Plasmo's `~` alias: `~lib/x` and `~/lib/x` both resolve under src/.
    alias: [{ find: /^~\/?(.*)$/, replacement: resolve(__dirname, "src") + "/$1" }]
  },
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "esnext",
    rollupOptions: {
      input: { popup: resolve(__dirname, "popup.html") },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]"
      }
    }
  }
})
