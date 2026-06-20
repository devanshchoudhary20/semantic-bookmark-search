interface FooterProps {
  count: number
  busy: boolean
  onReindex: () => void
}

export function Footer({ count, busy, onReindex }: FooterProps) {
  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-3 py-2 text-xs text-slate-400">
      <span>{count.toLocaleString()} indexed · on-device</span>
      <button
        type="button"
        onClick={onReindex}
        disabled={busy}
        className="rounded px-1.5 py-0.5 font-medium text-indigo-500 transition hover:bg-indigo-50 disabled:opacity-50">
        {busy ? "Re-indexing…" : "Re-index"}
      </button>
    </div>
  )
}
