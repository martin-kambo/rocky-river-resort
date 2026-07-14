/**
 * components/layout/Footer.tsx  — Server Component
 * Exact port of <footer> from index.html.
 */
import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ background: 'var(--dark)', padding: '5rem 5% 2.5rem', borderTop: '1px solid rgba(247,242,232,0.06)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '4rem',
          paddingBottom: '3.5rem',
          borderBottom: '1px solid rgba(247,242,232,0.06)',
          marginBottom: '1.8rem',
        }}
          className="ft-grid"
        >
          {/* Brand */}
          <div>
            <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', fontWeight: 300, color: 'rgba(247,242,232,0.8)', marginBottom: '.8rem', display: 'block', textDecoration: 'none' }}>
              <strong style={{ fontWeight: 600, color: 'var(--gold-warm)' }}>Rocky River</strong> Resort
            </Link>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '.82rem', color: 'rgba(247,242,232,0.35)', lineHeight: 1.85, maxWidth: 280, fontWeight: 300 }}>
              A luxury riverside retreat along the banks of River Athi, in the shadow of Kilimambogo Mountain, near the legendary 14 Falls — Thika East, Kenya.
            </p>
            <div style={{ display: 'flex', gap: '.7rem', marginTop: '1.8rem' }}>
              {['Fb', 'Ig', 'Tw', 'Wa'].map(s => (
                <a key={s} href="#" style={{
                  width: 32, height: 32, border: '1px solid rgba(247,242,232,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--sans)', fontSize: '.65rem', color: 'rgba(247,242,232,0.35)',
                  textDecoration: 'none', transition: 'all .3s',
                }}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <FooterCol title="Explore" links={[
            { label: 'Our Story',    href: '/#about'         },
            { label: 'Stays',        href: '/#accommodation' },
            { label: 'The Pool',     href: '/#pool'           },
            { label: 'Nature',       href: '/#scenic'         },
            { label: 'Experiences',  href: '/#experiences'    },
          ]} />

          {/* Stays */}
          <FooterCol title="Stays" links={[
            { label: 'Riverside Cottage', href: '/#accommodation' },
            { label: 'Falls View Suite',  href: '/#accommodation' },
            { label: 'Summit Villa',      href: '/#accommodation' },
            { label: 'Honeymoon Suite',   href: '/#accommodation' },
            { label: 'Corporate Packages',href: '/#accommodation' },
          ]} />

          {/* Visit */}
          <FooterCol title="Visit" links={[
            { label: 'Thika East, Kenya', href: '/#contact'  },
            { label: 'River Athi Banks',  href: '/#contact'  },
            { label: 'Near 14 Falls',     href: '/#contact'  },
            { label: 'Weddings & Events', href: '/#contact'  },
            { label: 'Book a Stay',       href: '/#booking'  },
          ]} />
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontFamily: 'var(--sans)', fontSize: '.68rem', color: 'rgba(247,242,232,0.18)', fontWeight: 300 }}>
          <span>© {year} Rocky River Resort · All rights reserved.</span>
          <span>Where serenity meets the river.</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .ft-grid { grid-template-columns: 1fr 1fr !important; gap: 2.5rem !important; } .ft-grid > :first-child { grid-column: span 2; } }
        @media (max-width: 860px)  { .ft-grid { grid-template-columns: 1fr !important; } .ft-grid > :first-child { grid-column: span 1; } }
      `}</style>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 style={{ fontFamily: 'var(--sans)', fontSize: '.6rem', letterSpacing: '.25em', textTransform: 'uppercase', color: 'var(--gold-warm)', marginBottom: '1.3rem', fontWeight: 400 }}>
        {title}
      </h4>
      <ul style={{ listStyle: 'none' }}>
        {links.map(l => (
          <li key={l.href} style={{ marginBottom: '.7rem' }}>
            <Link href={l.href} style={{ fontFamily: 'var(--sans)', fontSize: '.82rem', color: 'rgba(247,242,232,0.38)', textDecoration: 'none', fontWeight: 300, transition: 'color .3s' }}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}