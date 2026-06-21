import { BookmarkRow } from "~/components/BookmarkRow"
import type { EmbeddedBookmark } from "~/lib/types"

export interface BookmarkListItem {
  bookmark: EmbeddedBookmark
  score?: number
}

interface BookmarkListProps {
  items: BookmarkListItem[]
  label?: string
  footerNote?: string
}

export function BookmarkList({ items, label, footerNote }: BookmarkListProps) {
  return (
    <div className="flex-1 overflow-y-auto px-2 pb-1">
      {label && (
        <p className="sticky top-0 z-10 bg-white/95 px-1.5 pb-1.5 pt-2.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 backdrop-blur">
          {label}
        </p>
      )}
      <ul className="space-y-0.5">
        {items.map(({ bookmark, score }) => (
          <BookmarkRow key={bookmark.id} bookmark={bookmark} score={score} />
        ))}
      </ul>
      {footerNote && (
        <p className="px-2 py-3 text-center text-[11px] text-slate-400">
          {footerNote}
        </p>
      )}
    </div>
  )
}
