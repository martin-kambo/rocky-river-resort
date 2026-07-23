'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'

export function Navbar() {
  const locale = useLocale()

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-7xl flex items-center justify-between p-4">

        <Link
          href={`/${locale}`}
          className="font-serif text-xl text-forest font-semibold"
        >
          Rocky River Resort
        </Link>

        <nav className="flex gap-6 text-sm">
          <Link href={`/${locale}`}>Home</Link>
          <Link href={`/${locale}/accommodations`}>Rooms</Link>
          <Link href={`/${locale}/accommodations`}>amenities</Link>
          <Link href={`/${locale}/accommodations`}>experiences</Link>
          <Link href={`/${locale}/accommodations`}>gallery</Link>
          <Link href={`/${locale}/accommodations`}>blog</Link>
          <Link href={`/${locale}/contact`}>Contact</Link>
        </nav>

      </div>
    </header>
  )
}