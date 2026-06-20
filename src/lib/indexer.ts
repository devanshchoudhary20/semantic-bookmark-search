import { loadBookmarks } from "~lib/bookmarks"
import { deleteEmbeddings, getAllEmbeddings, putEmbedding } from "~lib/db"
import { embedBatch, warmUpModel } from "~lib/embedder"
import type { EmbeddedBookmark, IndexPhase, IndexProgress } from "~lib/types"

const BATCH_SIZE = 16

interface BuildOptions {
  force?: boolean
  onPhase: (phase: IndexPhase) => void
  onProgress: (progress: IndexProgress) => void
  onModelProgress: (ratio: number) => void
}

// Reconciles the cache against current bookmarks, embeds only what's new/changed,
// persisting each batch so an interrupted run resumes cleanly next open.
export async function buildIndex(
  options: BuildOptions
): Promise<EmbeddedBookmark[]> {
  const { force = false, onPhase, onProgress, onModelProgress } = options

  const bookmarks = await loadBookmarks()
  const cached = await getAllEmbeddings()
  const cachedById = new Map(cached.map((item) => [item.id, item]))
  const currentIds = new Set(bookmarks.map((b) => b.id))

  const staleIds = cached
    .filter((item) => !currentIds.has(item.id))
    .map((item) => item.id)
  await deleteEmbeddings(staleIds)

  if (bookmarks.length === 0) {
    onPhase("empty")
    return []
  }

  const fresh: EmbeddedBookmark[] = []
  const toEmbed = bookmarks.filter((bookmark) => {
    if (force) return true
    const hit = cachedById.get(bookmark.id)
    if (hit && hit.text === bookmark.text) {
      fresh.push(hit)
      return false
    }
    return true
  })

  if (toEmbed.length === 0) {
    onPhase("ready")
    return fresh
  }

  onPhase("loading-model")
  await warmUpModel(onModelProgress)

  onPhase("indexing")
  let done = 0
  onProgress({ done, total: toEmbed.length })

  for (let i = 0; i < toEmbed.length; i += BATCH_SIZE) {
    const batch = toEmbed.slice(i, i + BATCH_SIZE)
    const vectors = await embedBatch(batch.map((b) => b.text))

    await Promise.all(
      batch.map((bookmark, j) => {
        const record: EmbeddedBookmark = {
          ...bookmark,
          vector: vectors[j],
          updatedAt: Date.now()
        }
        fresh.push(record)
        return putEmbedding(record)
      })
    )

    done += batch.length
    onProgress({ done, total: toEmbed.length })
  }

  onPhase("ready")
  return fresh
}
