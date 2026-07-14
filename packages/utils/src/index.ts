import { differenceInCalendarDays } from 'date-fns'

/**
 * Generate a booking reference in format RRR-XXXXXX
 */
export function generateBookingReference(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = 'RRR-'
  for (let i = 0; i < 6; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

/**
 * Calculate number of nights between two date strings (YYYY-MM-DD)
 */
export function calcNights(checkIn: string, checkOut: string): number {
  return differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
}

/**
 * Format KES currency for display
 */
export function formatKes(amount: number): string {
  return `KES ${amount.toLocaleString('en-KE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`
}

/**
 * Format USD currency
 */
export function formatUsd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

/**
 * Format currency based on locale
 */
export function formatCurrency(
  kes: number,
  usd: number,
  locale: string,
): string {
  return locale === 'sw' || locale === 'en-KE' ? formatKes(kes) : formatUsd(usd)
}

/**
 * Slugify a string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}