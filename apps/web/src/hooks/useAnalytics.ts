'use client'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

/**
 * useAnalytics — fires a GA4 page_view on every route change.
 * Mount once in the root layout.
 * GA_ID is read from NEXT_PUBLIC_GA_ID env var.
 */
export function useAnalytics() {
  const pathname     = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const gaId = process.env.NEXT_PUBLIC_GA_ID
    if (!gaId || typeof window.gtag !== 'function') return
    window.gtag('event', 'page_view', {
      page_path:  pathname + (searchParams?.toString() ? `?${searchParams}` : ''),
      page_title: document.title,
    })
  }, [pathname, searchParams])
}