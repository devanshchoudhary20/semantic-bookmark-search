import type { EmbeddedBookmark, SearchHit } from "~lib/types"

// Vectors are L2-normalized at embed time, so cosine similarity is just the dot product.
function dot(a: Float32Array, b: Float32Array): number {
  let sum = 0
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i]
  }
  return sum
}

const MIN_SCORE = 0.25
const MAX_RESULTS = 25

export function rankBySimilarity(
  queryVector: Float32Array,
  corpus: EmbeddedBookmark[]
): SearchHit[] {
  const hits: SearchHit[] = []
  for (const item of corpus) {
    if (item.vector?.length !== queryVector.length) continue
    const score = dot(queryVector, item.vector)
    if (score >= MIN_SCORE) {
      hits.push({ ...item, score })
    }
  }
  hits.sort((a, b) => b.score - a.score)
  return hits.slice(0, MAX_RESULTS)
}
