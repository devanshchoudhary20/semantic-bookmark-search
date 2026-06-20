// Shared domain types for the extension.

export interface BookmarkRecord {
  id: string
  title: string
  url: string
  folder: string
  // Concatenated text actually fed to the embedder; used to detect staleness.
  text: string
}

export interface EmbeddedBookmark extends BookmarkRecord {
  vector: Float32Array
  updatedAt: number
}

export interface SearchHit extends EmbeddedBookmark {
  score: number
}

export type IndexPhase =
  | "idle"
  | "loading-model"
  | "indexing"
  | "ready"
  | "empty"
  | "error"

export interface IndexProgress {
  done: number
  total: number
}
