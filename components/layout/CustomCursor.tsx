'use client'
/**
 * components/layout/CustomCursor.tsx
 * Exact port of the cursor JS from index.html:
 * - Small dot follows mouse instantly
 * - Larger ring trails with 0.1 lerp
 * - Expands on hover over interactive elements
 * - Switches to gold (on-dark) for dark sections
 */
import { useEffect, useRef } from 'react'

const DARK_SECTIONS = ['pool', 'testimonials', 'booking']
const INTERACTIVE   = 'a,button,[role="button"],.room-card,.exp-item,.scenic-tile,.scenic-main,.strip-tile,.pool-stat,.menu-card'

export function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null)
  const ringRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      dot.style.left = mx + 'px'
      dot.style.top  = my + 'px'
    }
    const loop = () => {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'
      raf = requestAnimationFrame(loop)
    }

    // Cursor grow on interactive elements
    const grow  = () => document.body.classList.add('cursor-grow')
    const shrink= () => document.body.classList.remove('cursor-grow')

    // Dark-section detection on scroll (matches original JS exactly)
    const onScroll = () => {
      const mid = scrollY + window.innerHeight / 2
      let dark = false
      DARK_SECTIONS.forEach(id => {
        const el = document.getElementById(id)
        if (!el) return
        const top = el.getBoundingClientRect().top + scrollY
        if (mid >= top && mid <= top + el.offsetHeight) dark = true
      })
      document.body.classList.toggle('on-dark', dark)
    }

    document.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    raf = requestAnimationFrame(loop)

    // Attach grow listeners — rerun after page renders
    const attach = () => {
      document.querySelectorAll<HTMLElement>(INTERACTIVE).forEach(el => {
        el.addEventListener('mouseenter', grow)
        el.addEventListener('mouseleave', shrink)
      })
    }
    attach()

    return () => {
      document.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div id="cursor"       ref={dotRef}  aria-hidden="true" />
      <div id="cursor-trail" ref={ringRef} aria-hidden="true" />
    </>
  )
}