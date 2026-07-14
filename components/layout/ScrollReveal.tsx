'use client'
/**
 * components/layout/ScrollReveal.tsx
 * Initialises the IntersectionObserver that adds .on to
 * .rv, .rl, .rr elements — exactly as in the HTML files.
 * Rendered once per page in app/page.tsx and app/menu/page.tsx.
 */
import { useEffect } from 'react'

export function ScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on') }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.rv, .rl, .rr').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return null
}