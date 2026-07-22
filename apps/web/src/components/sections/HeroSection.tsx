'use client'
import Image               from 'next/image'
import { useTranslations } from 'next-intl'
import { BookingWidget }   from '../booking/BookingWidget'

export function HeroSection() {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Real resort background image */}
      <Image
        src="/images/river.jpg"
        alt="Rocky River Resort along the Athi River, Thika East, Kenya"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        quality={90}
      />
      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b
                      from-forest/80 via-forest/70 to-earth/90" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-2xl">
          <p className="text-gold text-xs tracking-[0.25em] uppercase mb-6">
            Thika East · Kenya · Along the Athi River
          </p>
          <h1 className="font-serif text-cream text-5xl sm:text-6xl lg:text-7xl font-light
                         leading-tight mb-6">
            {t('headline')}
          </h1>
          <p className="text-cream/80 text-lg sm:text-xl leading-relaxed mb-12">
            {t('subheadline')}
          </p>
          <BookingWidget />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10
                      flex flex-col items-center gap-2">
        <span className="text-cream/40 text-xs tracking-widest uppercase">
          {t('scrollDown')}
        </span>
        <svg className="h-5 w-5 text-gold animate-bounce"
             fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
