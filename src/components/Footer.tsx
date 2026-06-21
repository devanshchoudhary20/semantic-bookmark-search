interface FooterProps {
  count: number
  onReindex: () => void
}

export function Footer({ count, onReindex }: FooterProps) {
  return (
    <div className="flex items-center justify-between border-t border-slate-100 px-3.5 py-2 text-xs text-slate-400">
      <span className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        {count.toLocaleString()} indexed · private
      </span>
      <button
        type="button"
        onClick={onReindex}
        className="rounded-md px-1.5 py-0.5 font-medium text-indigo-500 transition hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300">
        Re-index
      </button>
    </div>
  )
}
