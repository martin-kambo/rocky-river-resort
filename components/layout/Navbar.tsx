'use client'
/**
 * components/layout/Navbar.tsx
 * Exact port of #nav from index.html.
 * - Transparent at top, frosted-glass when scrolled > 70px
 * - Logo: "Rocky River Resort" + gold subline
 * - Links: Story, Stays, The Pool, Nature, Experiences
 * - Right: "Reserve Now" sage CTA button
 */
import Link             from 'next/link'
import { useEffect, useState } from 'react'

const LINKS = [
  { label: 'Story',       href: '/#about'         },
  { label: 'Stays',       href: '/#accommodation' },
  { label: 'The Pool',    href: '/#pool'           },
  { label: 'Nature',      href: '/#scenic'         },
  { label: 'Experiences', href: '/#experiences'    },
  { label: 'Dining',      href: '/menu'            },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 70)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      id="nav"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? '1rem 5%' : '1.8rem 5%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(247,242,232,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(196,152,64,0.2)' : 'none',
        transition: 'padding .5s var(--ease-out), background .5s, border .5s',
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <span style={{
          fontFamily: 'var(--serif)', fontSize: '1.25rem', fontWeight: 600,
          letterSpacing: '.06em', color: scrolled ? 'var(--sage-deep)' : 'var(--ivory)',
        }}>
          Rocky River Resort
        </span>
        <span style={{
          fontFamily: 'var(--sans)', fontSize: '.7rem', letterSpacing: '.22em',
          textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 300,
        }}>
          Thika East · Kenya
        </span>
      </Link>

      {/* Desktop links */}
      <ul style={{ display: 'flex', gap: '2.2rem', listStyle: 'none', alignItems: 'center' }}
          className="nav-links-desktop">
        {LINKS.map(l => (
          <li key={l.href}>
            <Link href={l.href} style={{
              fontFamily: 'var(--sans)', fontSize: '.7rem', letterSpacing: '.2em',
              textTransform: 'uppercase', fontWeight: 300, textDecoration: 'none',
              color: scrolled ? 'var(--sage-mid)' : 'rgba(247,242,232,0.8)',
              transition: 'color .3s',
            }}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link href="/#booking" className="nav-book">Reserve Now</Link>

      {/* Mobile hamburger */}
      <button
        aria-label="Open menu"
        onClick={() => setMenuOpen(o => !o)}
        style={{
          display: 'none', flexDirection: 'column', gap: 5,
          background: 'none', border: 'none', cursor: 'pointer', padding: 4,
        }}
        className="nav-hamburger"
      >
        {[0,1,2].map(i => (
          <span key={i} style={{
            display: 'block', width: i === 2 ? 14 : 20, height: 1,
            background: scrolled ? 'var(--sage-deep)' : 'var(--ivory)',
            transition: 'background .3s',
          }} />
        ))}
      </button>

      {/* Responsive overrides via inline style tag */}
      <style>{`
        @media (max-width: 860px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger     { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}