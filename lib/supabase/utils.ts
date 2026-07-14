/**
 * lib/utils.ts
 * General-purpose utility functions.
 * Imported by components, hooks, and API routes.
 */

// ─────────────────────────────────────────────────────────
// PRICE FORMATTING
// ─────────────────────────────────────────────────────────

/**
 * Format a number as KES currency.
 * formatPrice(1400) → "KES 1,400"
 */
export function formatPrice(amount: number): string {
    return `KES ${amount.toLocaleString('en-KE')}`
  }
  
  /**
   * Format price per night.
   * formatPricePerNight(12500) → "KES 12,500 / night"
   */
  export function formatPricePerNight(amount: number): string {
    return `${formatPrice(amount)} / night`
  }
  
  // ─────────────────────────────────────────────────────────
  // STRING HELPERS
  // ─────────────────────────────────────────────────────────
  
  /**
   * Convert a display name to a URL-safe slug.
   * slugify("Cascade Chalet") → "cascade-chalet"
   * slugify("Nyama Choma & Ugali") → "nyama-choma-ugali"
   */
  export function slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')   // remove non-alphanumeric chars
      .replace(/\s+/g, '-')            // spaces → hyphens
      .replace(/-+/g, '-')             // collapse multiple hyphens
  }
  
  /**
   * Truncate text to a max length, appending ellipsis.
   * truncate("A very long description…", 60) → "A very long description…"
   */
  export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength).trimEnd() + '…'
  }
  
  /**
   * Capitalise the first letter of a string.
   * capitalise("riverbank cottage") → "Riverbank cottage"
   */
  export function capitalise(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }
  
  /**
   * Convert an amenities string to an array.
   * parseAmenities("WiFi, Hot shower, Balcony") → ["WiFi", "Hot shower", "Balcony"]
   */
  export function parseAmenities(raw: string): string[] {
    return raw
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
  }
  
  // ─────────────────────────────────────────────────────────
  // DATE HELPERS
  // ─────────────────────────────────────────────────────────
  
  /**
   * Format an ISO date string for display.
   * formatDate("2025-08-15T18:00:00") → "15 Aug 2025"
   */
  export function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-KE', {
      day:   'numeric',
      month: 'short',
      year:  'numeric',
    })
  }
  
  /**
   * Format an ISO datetime for display with time.
   * formatDateTime("2025-08-15T18:00:00") → "15 Aug 2025 · 6:00 PM"
   */
  export function formatDateTime(iso: string): string {
    const d = new Date(iso)
    const date = d.toLocaleDateString('en-KE', { day:'numeric', month:'short', year:'numeric' })
    const time = d.toLocaleTimeString('en-KE', { hour:'2-digit', minute:'2-digit' })
    return `${date} · ${time}`
  }
  
  /**
   * Format a relative time string.
   * timeAgo("2025-08-15T17:00:00") → "2 hours ago"
   */
  export function timeAgo(iso: string): string {
    const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
    if (seconds < 60)   return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
    if (seconds < 86400)return `${Math.floor(seconds / 3600)} hours ago`
    return `${Math.floor(seconds / 86400)} days ago`
  }
  
  // ─────────────────────────────────────────────────────────
  // CLASS NAME HELPER
  // ─────────────────────────────────────────────────────────
  
  /**
   * Merge class names, filtering out falsy values.
   * cn('base-class', isActive && 'active', undefined) → "base-class active"
   *
   * A lightweight alternative to clsx/classnames — no extra dependency.
   */
  export function cn(...classes: (string | boolean | undefined | null)[]): string {
    return classes.filter(Boolean).join(' ')
  }
  
  // ─────────────────────────────────────────────────────────
  // URL HELPERS
  // ─────────────────────────────────────────────────────────
  
  /**
   * Get the base URL for the app.
   * Works in both server and client contexts.
   */
  export function getBaseUrl(): string {
    if (typeof window !== 'undefined') return window.location.origin
    return process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rockyriverresort.co.ke'
  }
  
  // ─────────────────────────────────────────────────────────
  // VALIDATION HELPERS
  // ─────────────────────────────────────────────────────────
  
  /**
   * Check if a string is a valid email address.
   */
  export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
  
  /**
   * Check if a string is a valid Kenyan phone number.
   * Accepts: 0712345678, +254712345678, 254712345678
   */
  export function isValidKenyanPhone(phone: string): boolean {
    return /^(\+?254|0)[17]\d{8}$/.test(phone.replace(/\s/g, ''))
  }