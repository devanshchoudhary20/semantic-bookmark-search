import {
  env,
  pipeline,
  type FeatureExtractionPipeline
} from "@huggingface/transformers"

// Model weights are bundled inside the extension (models/ → dist/models) — zero network,
// fully offline, nothing fetched at runtime.
env.allowLocalModels = true
env.allowRemoteModels = false
env.localModelPath = chrome.runtime.getURL("models/")

const onnxWasm = env.backends.onnx.wasm!
// Single-threaded WASM avoids SharedArrayBuffer / cross-origin-isolation requirements,
// which an extension popup can't satisfy. Slower, but robust everywhere.
onnxWasm.numThreads = 1
// ONNX-runtime WASM is bundled inside the extension (ort-runtime → /ort) — MV3 bans
// loading the default jsDelivr-hosted .mjs/.wasm as remote code; these local URLs are allowed.
onnxWasm.wasmPaths = {
  wasm: chrome.runtime.getURL("ort/ort-wasm-simd-threaded.jsep.wasm"),
  mjs: chrome.runtime.getURL("ort/ort-wasm-simd-threaded.jsep.mjs")
}

const MODEL_ID = "Xenova/all-MiniLM-L6-v2"
const VECTOR_DIM = 384

let extractorPromise: Promise<FeatureExtractionPipeline> | null = null

function getExtractor(onProgress?: (ratio: number) => void) {
  if (!extractorPromise) {
    extractorPromise = pipeline("feature-extraction", MODEL_ID, {
      dtype: "q8",
      progress_callback: (event: { status?: string; progress?: number }) => {
        if (event?.status === "progress" && typeof event.progress === "number") {
          onProgress?.(event.progress / 100)
        }
      }
    })
  }
  return extractorPromise
}

// Warm up the model (downloads + compiles) so we can show a distinct loading phase.
export async function warmUpModel(onProgress?: (ratio: number) => void) {
  await getExtractor(onProgress)
}

// Mean-pooled, L2-normalized embedding → cosine similarity reduces to a dot product.
export async function embed(text: string): Promise<Float32Array> {
  const extractor = await getExtractor()
  const output = await extractor(text, { pooling: "mean", normalize: true })
  return new Float32Array(output.data as Float32Array)
}

export async function embedBatch(texts: string[]): Promise<Float32Array[]> {
  const extractor = await getExtractor()
  const output = await extractor(texts, { pooling: "mean", normalize: true })
  const flat = output.data as Float32Array
  return texts.map((_, i) => flat.slice(i * VECTOR_DIM, (i + 1) * VECTOR_DIM))
}
