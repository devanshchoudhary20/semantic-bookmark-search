export function Header() {
  return (
    <header className="flex items-center gap-2.5 px-3.5 py-2.5">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-sm">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="h-4 w-4 text-white">
          <path d="M6 3a1 1 0 0 0-1 1v16l7-4 7 4V4a1 1 0 0 0-1-1H6z" />
        </svg>
      </span>
      <p className="text-sm font-semibold text-slate-800">Bookmark Search</p>
      <span className="ml-auto rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
        on-device
      </span>
    </header>
  )
}
