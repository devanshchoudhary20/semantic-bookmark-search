import { useState } from "react"

import "~style.css"

import { Footer } from "~components/Footer"
import { IndexProgress } from "~components/IndexProgress"
import { ResultList } from "~components/ResultList"
import { SearchBar } from "~components/SearchBar"
import { StatusMessage } from "~components/StatusMessage"
import { useBookmarkIndex } from "~hooks/useBookmarkIndex"
import { useSemanticSearch } from "~hooks/useSemanticSearch"

function IndexPopup() {
  const [query, setQuery] = useState("")
  const { phase, progress, modelProgress, corpus, error, reindex } =
    useBookmarkIndex()

  const ready = phase === "ready"
  const indexing = phase === "loading-model" || phase === "indexing"
  const { hits, searching } = useSemanticSearch(query, corpus, ready)

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
              className="mt-1 rounded-md bg-indigo-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-indigo-600">
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

    if (indexing || phase === "idle") {
      return (
        <IndexProgress
          phase={phase === "idle" ? "loading-model" : phase}
          progress={progress}
          modelProgress={modelProgress}
        />
      )
    }

    return <ResultList query={query} hits={hits} searching={searching} />
  }

  return (
    <div className="flex h-[560px] w-[400px] flex-col bg-white font-sans">
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
