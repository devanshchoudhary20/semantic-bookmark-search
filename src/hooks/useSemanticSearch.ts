import { useEffect, useRef, useState } from "react"

import { embed } from "~lib/embedder"
import { rankBySimilarity } from "~lib/search"
import type { EmbeddedBookmark, SearchHit } from "~lib/types"

const DEBOUNCE_MS = 180

interface SemanticSearch {
  hits: SearchHit[]
  searching: boolean
}

// Debounced query → embed → cosine rank. Stale responses are dropped via a request token.
export function useSemanticSearch(
  query: string,
  corpus: EmbeddedBookmark[],
  enabled: boolean
): SemanticSearch {
  const [hits, setHits] = useState<SearchHit[]>([])
  const [searching, setSearching] = useState(false)
  const tokenRef = useRef(0)

  useEffect(() => {
    const trimmed = query.trim()
    if (!enabled || trimmed.length === 0) {
      setHits([])
      setSearching(false)
      return
    }

    const token = ++tokenRef.current
    setSearching(true)
    const timer = setTimeout(async () => {
      try {
        const queryVector = await embed(trimmed)
        if (token !== tokenRef.current) return
        setHits(rankBySimilarity(queryVector, corpus))
      } catch {
        if (token === tokenRef.current) setHits([])
      } finally {
        if (token === tokenRef.current) setSearching(false)
      }
    }, DEBOUNCE_MS)

    return () => clearTimeout(timer)
  }, [query, corpus, enabled])

  return { hits, searching }
}
