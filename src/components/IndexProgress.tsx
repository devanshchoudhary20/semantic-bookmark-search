import type { IndexPhase, IndexProgress as Progress } from "~/lib/types"

interface IndexProgressProps {
  phase: IndexPhase
  progress: Progress
  modelProgress: number
}

export function IndexProgress({ phase, progress, modelProgress }: IndexProgressProps) {
  const loadingModel = phase === "loading-model"
  const ratio = loadingModel
    ? modelProgress
    : progress.total > 0
      ? progress.done / progress.total
      : 0
  const percent = Math.min(100, Math.round(ratio * 100))

  const title = loadingModel ? "Warming up the model…" : "Indexing your bookmarks…"
  const detail = loadingModel
    ? "Runs fully on your device — one time only."
    : `${progress.done.toLocaleString()} / ${progress.total.toLocaleString()} embedded`

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-10 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
        🧠
      </span>
      <p className="text-sm font-medium text-slate-700">{title}</p>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 transition-all duration-300"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <p className="text-xs tabular-nums text-slate-500">{detail}</p>
    </div>
  )
}
