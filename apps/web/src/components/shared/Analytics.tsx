'use client'
import { Suspense } from 'react'
import { useAnalytics } from '../../hooks/useAnalytics'

function AnalyticsInner() {
  useAnalytics()
  return null
}

/**
 * Analytics — mount once in root layout.
 * Wrapped in Suspense as useSearchParams() requires it in Next.js 14.
 */
export function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsInner />
    </Suspense>
  )
}