import type { Metadata }       from 'next'
import { ExperiencesSection }  from '../../../../components/sections/ExperiencesSection'
import { CtaBanner }           from '../../../../components/sections/CtaBanner'

export const metadata: Metadata = {
  title:       'Experiences — Rocky River Resort',
  description: 'From sunrise kayaking to bush dinners and night safaris — curated experiences along the Athi River.',
}

export default function ExperiencesPage() {
  return (
    <>
      <section className="bg-forest section-padding pt-32">
        <div className="container-narrow text-center">
          <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4">Beyond the Room</p>
          <h1 className="font-serif text-5xl sm:text-6xl text-cream font-light mb-6">Experiences</h1>
          <div className="w-16 h-px bg-gold mx-auto mb-6" />
          <p className="text-cream/70 text-lg max-w-xl mx-auto">
            Curated moments that turn a stay into a story worth telling.
          </p>
        </div>
      </section>
      <ExperiencesSection />
      <CtaBanner />
    </>
  )
}