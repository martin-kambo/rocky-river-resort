'use client'

/**
 * hooks/useScroll.ts
 * Returns the current scroll Y position and a boolean
 * indicating whether the user has scrolled past a threshold.
 *
 * Used in Navbar.tsx to switch between transparent and
 * frosted-glass styles — matching the approved design.
 *
 * Usage:
 *   const { scrolled, scrollY } = useScroll(70)
 *   // scrolled = true once user scrolls past 70px
 */

import { useState, useEffect } from 'react'

interface ScrollState {
  scrollY:   number
  scrolled:  boolean
}

export function useScroll(threshold = 70): ScrollState {
  const [state, setState] = useState<ScrollState>({
    scrollY:  0,
    scrolled: false,
  })

  useEffect(() => {
    function handleScroll() {
      const y = window.scrollY
      setState({ scrollY: y, scrolled: y > threshold })
    }

    // Set initial state
    handleScroll()

    // Passive listener — doesn't block scrolling
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return state
}