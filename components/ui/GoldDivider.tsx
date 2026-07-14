/ ── GOLD DIVIDER ───────────────────────────────────────────
// 44px horizontal rule in gold. Placed under section headings.

export function GoldDivider({ className }: { className?: string }) {
  return (
    <div className={cn('gold-divider', className)} />  // defined in globals.css
  )
}