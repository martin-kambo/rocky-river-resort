'use client'
import { useTranslations } from 'next-intl'
import { BookingWidget }   from '../booking/BookingWidget'

export function HeroSection() {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest via-forest/90 to-earth" />
      <div className="absolute inset-0 opacity-20"
        style={{ backgroundImage: 'url("/hero-pattern.svg")', backgroundSize: '60px' }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p className="text-gold text-xs tracking-[0.25em] uppercase mb-6 animate-fade-in">
            Thika East · Kenya · Along the Athi River
          </p>

          {/* Headline */}
          <h1 className="font-serif text-cream text-5xl sm:text-6xl lg:text-7xl font-light
                         leading-tight mb-6 animate-fade-up">
            {t('headline')}
          </h1>

          {/* Subheadline */}
          <p className="text-cream/70 text-lg sm:text-xl leading-relaxed mb-12 animate-fade-up"
            style={{ animationDelay: '0.1s' }}>
            {t('subheadline')}
          </p>

          {/* Booking widget */}
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <BookingWidget />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-cream/40 text-xs tracking-widest uppercase">{t('scrollDown')}</span>
        <svg className="h-5 w-5 text-gold animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}