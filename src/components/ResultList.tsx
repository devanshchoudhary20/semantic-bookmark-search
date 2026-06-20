import { ResultRow } from "~components/ResultRow"
import { StatusMessage } from "~components/StatusMessage"
import type { SearchHit } from "~lib/types"

interface ResultListProps {
  query: string
  hits: SearchHit[]
  searching: boolean
}

export function ResultList({ query, hits, searching }: ResultListProps) {
  const hasQuery = query.trim().length > 0

  if (!hasQuery) {
    return (
      <StatusMessage
        icon="🔍"
        title="Search by meaning"
        detail="Try “article about retry backoff” or “that CSS grid guide”."
      />
    )
  }

  if (hits.length === 0 && !searching) {
    return (
      <StatusMessage
        icon="🤔"
        title="No close matches"
        detail="Try describing the idea in different words."
      />
    )
  }

  return (
    <ul className="flex-1 divide-y divide-slate-100 overflow-y-auto">
      {hits.map((hit) => (
        <ResultRow key={hit.id} hit={hit} />
      ))}
    </ul>
  )
}
