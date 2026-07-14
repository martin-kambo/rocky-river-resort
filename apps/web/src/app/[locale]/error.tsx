'use client'
import { useEffect } from 'react'

export default function Error({
  error, reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-gold text-xs tracking-widest uppercase mb-4">Error</p>
        <h1 className="font-serif text-4xl text-forest font-light mb-4">Something went wrong</h1>
        <p className="text-sand mb-8">
          We encountered an unexpected error. Please try again or contact us if the problem persists.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-gold text-earth px-6 py-3 rounded
                     font-medium hover:bg-gold-dark transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}