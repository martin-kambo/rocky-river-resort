import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-gold text-xs tracking-widest uppercase mb-4">404</p>
        <h1 className="font-serif text-4xl text-forest font-light mb-4">Page Not Found</h1>
        <p className="text-sand mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/en"
          className="inline-flex items-center gap-2 bg-gold text-earth px-6 py-3 rounded
                     font-medium hover:bg-gold-dark transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}