import { useCallback, useEffect, useRef, useState } from "react"

import { buildIndex } from "~lib/indexer"
import type { EmbeddedBookmark, IndexPhase, IndexProgress } from "~lib/types"

interface BookmarkIndex {
  phase: IndexPhase
  progress: IndexProgress
  modelProgress: number
  corpus: EmbeddedBookmark[]
  error: string
  reindex: () => void
}

// Owns the lifecycle of the on-device index: build on open, expose phase/progress, allow re-index.
export function useBookmarkIndex(): BookmarkIndex {
  const [phase, setPhase] = useState<IndexPhase>("idle")
  const [progress, setProgress] = useState<IndexProgress>({ done: 0, total: 0 })
  const [modelProgress, setModelProgress] = useState(0)
  const [corpus, setCorpus] = useState<EmbeddedBookmark[]>([])
  const [error, setError] = useState("")
  const runningRef = useRef(false)

  const run = useCallback(async (force: boolean) => {
    if (runningRef.current) return
    runningRef.current = true
    setError("")
    try {
      const next = await buildIndex({
        force,
        onPhase: setPhase,
        onProgress: setProgress,
        onModelProgress: setModelProgress
      })
      setCorpus(next)
    } catch (err) {
      setPhase("error")
      setError(err instanceof Error ? err.message : "Indexing failed.")
    } finally {
      runningRef.current = false
    }
  }, [])

  useEffect(() => {
    run(false)
  }, [run])

  const reindex = useCallback(() => {
    setProgress({ done: 0, total: 0 })
    setModelProgress(0)
    run(true)
  }, [run])

  return { phase, progress, modelProgress, corpus, error, reindex }
}
