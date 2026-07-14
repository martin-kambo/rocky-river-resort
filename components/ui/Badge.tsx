/**
 * components/ui/Badge.tsx
 * Status pills and category tags used throughout the site.
 */

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type BadgeVariant =
  | 'green' | 'amber' | 'red' | 'blue' | 'gold'
  | 'popular' | 'veg' | 'spicy'
  | 'default'

interface BadgeProps {
  variant?:  BadgeVariant
  children:  ReactNode
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  green:   'bg-status-green-pale   text-status-green',
  amber:   'bg-status-amber-pale   text-status-amber',
  red:     'bg-status-red-pale     text-status-red',
  blue:    'bg-status-blue-pale    text-status-blue',
  gold:    'bg-gold-pale           text-gold-warm',
  popular: 'bg-gold                text-dark',
  veg:     'bg-river-pale          text-river-mid',
  spicy:   'bg-[#FAE0D0]           text-dusk',
  default: 'bg-sand                text-burgundy-mid',
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-block font-sans text-[0.55rem] tracking-[0.12em]',
      'uppercase font-normal px-[0.7rem] py-[0.22rem]',
      variants[variant],
      className,
    )}>
      {children}
    </span>
  )
}

/** Map an order status string to a badge variant */
export function OrderStatusBadge({ status }: { status: string }) {
  const map: Record<string, BadgeVariant> = {
    pending:   'amber',
    confirmed: 'blue',
    delivered: 'green',
    cancelled: 'red',
  }
  return <Badge variant={map[status] ?? 'default'}>{status}</Badge>
}