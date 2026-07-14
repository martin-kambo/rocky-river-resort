// ── SECTION TITLE ──────────────────────────────────────────
// Large Cormorant serif heading. <em> renders in river-mid colour.
// Usage: <SectionTitle>River <em>Table</em></SectionTitle>

interface SectionTitleProps {
    children:   ReactNode
    light?:     boolean   // true on dark backgrounds (ivory text)
    as?:        'h1' | 'h2' | 'h3'
    className?: string
  }
  
  export function SectionTitle({
    children,
    light,
    as: Tag = 'h2',
    className,
  }: SectionTitleProps) {
    return (
      <Tag className={cn(
        'section-title',   // defined in globals.css
        light && 'text-ivory [&_em]:text-gold-warm',
        className,
      )}>
        {children}
      </Tag>
    )
  }