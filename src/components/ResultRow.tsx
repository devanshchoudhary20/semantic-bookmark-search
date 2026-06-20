import type { SearchHit } from "~lib/types"

interface ResultRowProps {
  hit: SearchHit
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

export function ResultRow({ hit }: ResultRowProps) {
  const host = hostOf(hit.url)
  const folder = hit.folder || "Unfiled"
  const matchPercent = Math.round(hit.score * 100)

  const open = () => {
    chrome.tabs.create({ url: hit.url })
  }

  return (
    <li>
      <button
        type="button"
        onClick={open}
        title={hit.url}
        className="flex w-full flex-col gap-0.5 px-3 py-2 text-left transition hover:bg-indigo-50 focus-visible:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-300">
        <span className="line-clamp-1 text-sm font-medium text-slate-800">
          {hit.title}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="truncate">{host}</span>
          <span className="text-slate-300">·</span>
          <span className="truncate text-slate-400">{folder}</span>
          <span className="ml-auto shrink-0 text-indigo-400">{matchPercent}%</span>
        </span>
      </button>
    </li>
  )
}
