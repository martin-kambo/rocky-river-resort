/**
 * components/ui/Typography.tsx
 * Typography atoms: EyebrowLabel, SectionTitle, GoldDivider.
 * Used in every section of the homepage and inner pages.
 *
 * All export named — import what you need:
 *   import { EyebrowLabel, SectionTitle, GoldDivider } from '@/components/ui/Typography'
 */

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

// ── EYEBROW LABEL ──────────────────────────────────────────
// Gold, letter-spaced, with a decorative line on the left.
// "River Table Menu", "Accommodations", "Our Story"

interface EyebrowProps {
  children:   ReactNode
  light?:     boolean   // true on dark backgrounds
  className?: string
}

export function EyebrowLabel({ children, light, className }: EyebrowProps) {
  return (
    <div className={cn(
      'eyebrow',                                           // defined in globals.css
      light && '[&::before]:bg-gold-warm text-gold-warm', // lighter on dark bg
      className,
    )}>
      {children}
    </div>
  )
}

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

// ── GOLD DIVIDER ───────────────────────────────────────────
// 44px horizontal rule in gold. Placed under section headings.

export function GoldDivider({ className }: { className?: string }) {
  return (
    <div className={cn('gold-divider', className)} />  // defined in globals.css
  )
}

// ── SECTION HEAD ───────────────────────────────────────────
// Convenience wrapper: Eyebrow + Title + Divider as a unit.

interface SectionHeadProps {
  eyebrow:    string
  title:      ReactNode
  centered?:  boolean
  light?:     boolean
  className?: string
}

export function SectionHead({
  eyebrow,
  title,
  centered,
  light,
  className,
}: SectionHeadProps) {
  return (
    <div className={cn(
      'mb-[2.8rem]',
      centered && 'text-center [&_.eyebrow]:justify-center',
      className,
    )}>
      <EyebrowLabel light={light}>{eyebrow}</EyebrowLabel>
      <SectionTitle light={light}>{title}</SectionTitle>
      <GoldDivider className={centered ? 'mx-auto' : ''} />
    </div>
  )
}