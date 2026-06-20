// Plasmo doesn't copy raw static files, so we vendor the ONNX-runtime WASM into each
// build output ourselves. MV3 forbids remote code, so these must ship inside the package.
import { cpSync, existsSync, mkdirSync } from "node:fs"
import { join } from "node:path"

const SRC = "ort-runtime"
const FILES = [
  "ort-wasm-simd-threaded.jsep.mjs",
  "ort-wasm-simd-threaded.jsep.wasm"
]
const TARGETS = ["build/chrome-mv3-prod", "build/chrome-mv3-dev"]

let copied = 0
for (const target of TARGETS) {
  if (!existsSync(target)) continue
  const dest = join(target, "ort")
  mkdirSync(dest, { recursive: true })
  for (const file of FILES) cpSync(join(SRC, file), join(dest, file))
  console.log(`✓ copied ONNX-runtime WASM → ${dest}`)
  copied++
}

if (copied === 0) {
  console.warn("⚠ no build output found — run `plasmo build` or `plasmo dev` first")
}
