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
    <div className="border-b border-slate-200 p-3">
      <input
        autoFocus
        type="search"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Search bookmarks by meaning"
        className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 disabled:opacity-60"
      />
    </div>
  )
}
