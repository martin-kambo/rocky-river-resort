'use client'

/**
 * hooks/useMediaQuery.ts
 * Returns true/false based on a CSS media query.
 * Used for showing/hiding mobile menu, adjusting layouts.
 *
 * Usage:
 *   const isMobile  = useMediaQuery('(max-width: 768px)')
 *   const isTablet  = useMediaQuery('(max-width: 1024px)')
 *   const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
 */

import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  // Default to false on server (SSR) — avoids hydration mismatch
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    // Set correct value immediately on mount
    setMatches(media.matches)

    // Update whenever the match changes
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

// ── Convenience hooks for common breakpoints ──────────────

/** true when viewport width ≤ 768px */
export function useIsMobile() {
  return useMediaQuery('(max-width: 768px)')
}

/** true when viewport width ≤ 1024px */
export function useIsTablet() {
  return useMediaQuery('(max-width: 1024px)')
}

/** true when user prefers reduced motion */
export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}