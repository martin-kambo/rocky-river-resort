'use client'

/**
 * components/layout/MobileMenu.tsx
 * Full-screen slide-in mobile navigation drawer.
 * Dark background, ivory text, gold accents — matches the design.
 */

import Link                from 'next/link'
import { useEffect }       from 'react'
import { cn }              from '@/lib/utils'
import { buildWhatsAppEnquiryURL } from '@/lib/whatsapp'

interface MobileMenuProps {
  isOpen:  boolean
  onClose: () => void
  links:   { label: string; href: string }[]
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-[900] bg-dark/60 backdrop-blur-sm',
          'transition-opacity duration-400',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
      />

      {/* Drawer */}
      <nav
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={cn(
          'fixed top-0 right-0 bottom-0 z-[950] w-[80vw] max-w-sm',
          'bg-dark flex flex-col',
          'border-l border-gold/10',
          'transition-transform duration-500',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-6 border-b border-gold/10">
          <div className="flex flex-col">
            <span className="font-serif text-ivory text-base italic">Rocky River Resort</span>
            <span className="font-sans text-[0.58rem] tracking-[0.22em] uppercase text-gold/50 mt-0.5">
              Thika East · Kenya
            </span>
          </div>
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="text-ivory/40 hover:text-ivory transition-colors p-1"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Links */}
        <ul className="flex-1 flex flex-col px-7 py-8 gap-1 list-none">
          {links.map((link, i) => (
            <li key={link.href} style={{ transitionDelay: `${i * 50}ms` }}>
              <Link
                href={link.href}
                onClick={onClose}
                className={cn(
                  'flex items-center justify-between py-4',
                  'font-sans text-[0.75rem] tracking-[0.18em] uppercase font-light',
                  'text-ivory/50 hover:text-gold',
                  'border-b border-ivory/5',
                  'transition-colors duration-200',
                )}
              >
                {link.label}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </Link>
            </li>
          ))}
        </ul>

        {/* Footer CTAs */}
        <div className="px-7 pb-10 flex flex-col gap-3">
          <a
            href={buildWhatsAppEnquiryURL()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 border border-[#25D366]/30 text-[#25D366] font-sans text-[0.68rem] tracking-[0.2em] uppercase"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp Us
          </a>
          <Link
            href="/#booking"
            onClick={onClose}
            className="btn-primary text-center py-3 font-sans text-[0.68rem] tracking-[0.2em] uppercase"
          >
            Reserve Now
          </Link>
        </div>
      </nav>
    </>
  )
}