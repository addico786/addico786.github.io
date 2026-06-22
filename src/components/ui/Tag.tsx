export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-surface/60 px-2.5 py-1 font-mono text-[11px] text-muted">
      {children}
    </span>
  )
}
