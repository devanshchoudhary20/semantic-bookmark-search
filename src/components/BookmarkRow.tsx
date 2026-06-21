import { Favicon } from "~/components/Favicon"
import type { EmbeddedBookmark } from "~/lib/types"

interface BookmarkRowProps {
  bookmark: EmbeddedBookmark
  score?: number
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

function scoreTone(percent: number): string {
  if (percent >= 55) return "bg-emerald-50 text-emerald-600"
  if (percent >= 40) return "bg-indigo-50 text-indigo-600"
  return "bg-slate-100 text-slate-500"
}

export function BookmarkRow({ bookmark, score }: BookmarkRowProps) {
  const host = hostOf(bookmark.url)
  const folder = bookmark.folder || "Unfiled"
  const showScore = typeof score === "number"
  const percent = showScore ? Math.round(score * 100) : 0

  const open = () => {
    chrome.tabs.create({ url: bookmark.url })
  }

  return (
    <li>
      <button
        type="button"
        onClick={open}
        title={bookmark.url}
        className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300">
        <Favicon url={bookmark.url} title={bookmark.title} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-slate-800">
            {bookmark.title}
          </span>
          <span className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400">
            <span className="truncate text-slate-500">{host}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{folder}</span>
          </span>
        </span>
        {showScore && (
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold tabular-nums ${scoreTone(percent)}`}>
            {percent}%
          </span>
        )}
      </button>
    </li>
  )
}
