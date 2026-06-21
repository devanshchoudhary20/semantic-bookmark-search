import { useState } from "react"

interface FaviconProps {
  url: string
  title: string
}

// Deterministic accent so the letter fallback is stable per-site, not random.
const COLORS = [
  "bg-rose-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-sky-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-fuchsia-500",
  "bg-pink-500"
]

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

function colorFor(seed: string): string {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  }
  return COLORS[hash % COLORS.length]
}

// Uses Chrome's local favicon store (no network). Falls back to a colored initial.
export function Favicon({ url, title }: FaviconProps) {
  const [failed, setFailed] = useState(false)
  const host = hostOf(url)

  if (failed) {
    const letter = (title.trim()[0] ?? host[0] ?? "?").toUpperCase()
    return (
      <span
        aria-hidden="true"
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-semibold text-white ${colorFor(host)}`}>
        {letter}
      </span>
    )
  }

  const src = chrome.runtime.getURL(
    `/_favicon/?pageUrl=${encodeURIComponent(url)}&size=32`
  )
  return (
    <img
      src={src}
      alt=""
      width={32}
      height={32}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-8 w-8 shrink-0 rounded-lg border border-slate-100 bg-white object-contain p-1"
    />
  )
}
