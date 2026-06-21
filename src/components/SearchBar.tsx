interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  disabled: boolean
  count: number
}

export function SearchBar({ value, onChange, disabled, count }: SearchBarProps) {
  const placeholder = disabled
    ? "Preparing your index…"
    : `Search ${count.toLocaleString()} bookmarks by meaning`

  return (
    <div className="px-3 pb-2">
      <div className="relative">
        <svg
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400">
          <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
          <path
            d="m17 17-3.2-3.2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <input
          autoFocus
          type="search"
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          aria-label="Search bookmarks by meaning"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100 disabled:opacity-60"
        />
      </div>
    </div>
  )
}
