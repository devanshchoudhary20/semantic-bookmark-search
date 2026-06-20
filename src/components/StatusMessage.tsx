import type { ReactNode } from "react"

interface StatusMessageProps {
  icon: string
  title: string
  detail: string
  action?: ReactNode
}

// Shared empty / no-results / error surface. Guarantees something always renders.
export function StatusMessage({ icon, title, detail, action }: StatusMessageProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
      <span className="text-3xl" aria-hidden="true">
        {icon}
      </span>
      <p className="text-sm font-medium text-slate-700">{title}</p>
      <p className="text-xs text-slate-500">{detail}</p>
      {action}
    </div>
  )
}
