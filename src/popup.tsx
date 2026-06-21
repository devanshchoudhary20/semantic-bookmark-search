import { useMemo, useState } from "react"

import "~/style.css"

import { BookmarkList, type BookmarkListItem } from "~/components/BookmarkList"
import { Footer } from "~/components/Footer"
import { Header } from "~/components/Header"
import { IndexProgress } from "~/components/IndexProgress"
import { SearchBar } from "~/components/SearchBar"
import { StatusMessage } from "~/components/StatusMessage"
import { useBookmarkIndex } from "~/hooks/useBookmarkIndex"
import { useSemanticSearch } from "~/hooks/useSemanticSearch"

// Browsing the full list is a convenience; search is the point. Cap to stay snappy.
const BROWSE_LIMIT = 200

function IndexPopup() {
  const [query, setQuery] = useState("")
  const { phase, progress, modelProgress, corpus, error, reindex } =
    useBookmarkIndex()

  const ready = phase === "ready"
  const indexing =
    phase === "idle" || phase === "loading-model" || phase === "indexing"
  const { hits, searching } = useSemanticSearch(query, corpus, ready)
  const trimmed = query.trim()

  const browseItems = useMemo<BookmarkListItem[]>(
    () =>
      [...corpus]
        .sort((a, b) => a.title.localeCompare(b.title))
        .slice(0, BROWSE_LIMIT)
        .map((bookmark) => ({ bookmark })),
    [corpus]
  )
  const searchItems = useMemo<BookmarkListItem[]>(
    () => hits.map((hit) => ({ bookmark: hit, score: hit.score })),
    [hits]
  )
  const hiddenCount = Math.max(0, corpus.length - BROWSE_LIMIT)

  const renderBody = () => {
    if (phase === "error") {
      return (
        <StatusMessage
          icon="⚠️"
          title="Something went wrong"
          detail={error || "Could not build the index."}
          action={
            <button
              type="button"
              onClick={reindex}
              className="mt-1 rounded-lg bg-indigo-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-indigo-600">
              Try again
            </button>
          }
        />
      )
    }

    if (phase === "empty") {
      return (
        <StatusMessage
          icon="📭"
          title="No bookmarks yet"
          detail="Save a few bookmarks, then re-index to search them by meaning."
        />
      )
    }

    if (indexing) {
      return (
        <IndexProgress
          phase={phase === "idle" ? "loading-model" : phase}
          progress={progress}
          modelProgress={modelProgress}
        />
      )
    }

    if (!trimmed) {
      return (
        <BookmarkList
          label={`All bookmarks · ${corpus.length.toLocaleString()}`}
          items={browseItems}
          footerNote={
            hiddenCount > 0
              ? `Showing ${BROWSE_LIMIT} of ${corpus.length.toLocaleString()} — search to find the rest`
              : undefined
          }
        />
      )
    }

    if (searchItems.length > 0) {
      return <BookmarkList items={searchItems} />
    }

    if (searching) {
      return (
        <StatusMessage
          icon="⏳"
          title="Searching…"
          detail="Ranking your bookmarks by meaning."
        />
      )
    }

    return (
      <StatusMessage
        icon="🔍"
        title="No close matches"
        detail="Try describing the idea in different words."
      />
    )
  }

  return (
    <div className="flex h-[560px] w-[400px] flex-col bg-white font-sans text-slate-900">
      <Header />
      <SearchBar
        value={query}
        onChange={setQuery}
        disabled={!ready}
        count={corpus.length}
      />
      {renderBody()}
      {ready && <Footer count={corpus.length} onReindex={reindex} />}
    </div>
  )
}

export default IndexPopup
