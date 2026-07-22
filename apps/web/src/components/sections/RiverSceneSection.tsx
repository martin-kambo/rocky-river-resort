import Image from 'next/image'
import Link  from 'next/link'
import { getLocale } from 'next-intl/server'

export async function RiverSceneSection() {
  const locale = await getLocale()

  return (
    <section
      aria-label="The Athi River at Rocky River Resort"
      className="relative bg-earth overflow-hidden"
    >
      {/* ── Desktop: image left, text right ── */}
      <div className="hidden lg:grid lg:grid-cols-2 min-h-[80vh]">
        <div className="relative">
          <Image
            src="/images/river.jpg"
            alt="The Athi River flowing beside Rocky River Resort, Thika East, Kenya"
            fill
            sizes="50vw"
            className="object-cover object-center"
            quality={90}
          />
          <div className="absolute inset-y-0 right-0 w-32
                          bg-gradient-to-l from-earth to-transparent" />
        </div>

        <div className="flex flex-col justify-center px-16 xl:px-24 py-20 bg-earth">
          <p className="text-gold text-xs tracking-[0.25em] uppercase mb-6">The River</p>
          <h2 className="font-serif text-cream text-4xl xl:text-5xl font-light leading-tight mb-8">
            Wake Up to the Sound<br />of Flowing Water
          </h2>
          <div className="w-12 h-px bg-gold mb-8" />
          <p className="text-cream/70 text-lg leading-relaxed mb-4">
            The Athi River runs just steps from your room. In the mornings, the
            rapids carry a sound no alarm clock can replicate. By afternoon, the
            sun turns the water gold.
          </p>
          <p className="text-cream/60 text-base leading-relaxed mb-10">
            Rocky River Resort was built here deliberately — not in spite of the
            river, but because of it. Every room faces the water.
          </p>
          <div className="grid grid-cols-3 gap-6 mb-12 border-t border-cream/10 pt-8">
            {[
              { value: '12',   label: 'acre estate'   },
              { value: '4',    label: 'room types'    },
              { value: '140+', label: 'bird species'  },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-gold font-serif text-3xl font-light">{value}</p>
                <p className="text-cream/40 text-xs uppercase tracking-wider mt-1">{label}</p>
              </div>
            ))}
          </div>
          <Link
            href={`/${locale}/book`}
            className="inline-flex items-center gap-3 bg-gold text-earth
                       px-8 py-4 rounded font-medium text-sm tracking-wide
                       hover:bg-gold-dark transition-colors self-start group"
          >
            Reserve Your Room
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* ── Mobile: stacked ── */}
      <div className="lg:hidden">
        <div className="relative w-full h-[70vh]">
          <Image
            src="/images/river.jpg"
            alt="The Athi River flowing beside Rocky River Resort, Thika East, Kenya"
            fill
            sizes="100vw"
            className="object-cover object-center"
            quality={85}
          />
          <div className="absolute inset-x-0 bottom-0 h-48
                          bg-gradient-to-t from-earth to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-gold text-xs tracking-[0.2em] uppercase mb-2">
              Athi River · Thika East, Kenya
            </p>
            <h2 className="font-serif text-cream text-3xl font-light leading-tight">
              Wake Up to the Sound<br />of Flowing Water
            </h2>
          </div>
        </div>
        <div className="bg-earth px-6 py-12">
          <div className="w-10 h-px bg-gold mb-6" />
          <p className="text-cream/70 text-base leading-relaxed mb-8">
            Every room faces the water. Every experience starts at its edge.
            Rocky River Resort was built here deliberately — not in spite of the
            river, but because of it.
          </p>
          <div className="grid grid-cols-3 gap-4 mb-8 border-t border-cream/10 pt-6">
            {[
              { value: '12',   label: 'acres'        },
              { value: '4',    label: 'room types'   },
              { value: '140+', label: 'bird species' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-gold font-serif text-2xl font-light">{value}</p>
                <p className="text-cream/40 text-xs uppercase tracking-wide mt-1">{label}</p>
              </div>
            ))}
          </div>
          <Link
            href={`/${locale}/book`}
            className="flex items-center justify-center gap-2 bg-gold text-earth
                       px-6 py-4 rounded font-medium text-sm w-full
                       hover:bg-gold-dark transition-colors"
          >
            Reserve Your Room →
          </Link>
        </div>
      </div>
    </section>
  )
}