import type { Metadata }     from 'next'
import { AmenitiesSection }  from '@/components/sections/AmenitiesSection'
import { CtaBanner }         from '@/components/sections/CtaBanner'

export const metadata: Metadata = {
  title:       'Amenities — Rocky River Resort',
  description: 'From the river-facing infinity pool to the Athi Restaurant and riverside spa, discover what awaits at Rocky River Resort.',
}

export default function AmenitiesPage() {
  return (
    <>
      <section className="bg-forest section-padding pt-32">
        <div className="container-narrow text-center">
          <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4">The Resort</p>
          <h1 className="font-serif text-5xl sm:text-6xl text-cream font-light mb-6">Amenities</h1>
          <div className="w-16 h-px bg-gold mx-auto mb-6" />
          <p className="text-cream/70 text-lg max-w-xl mx-auto">
            Every feature of Rocky River Resort is designed to enrich your connection with the river and the land.
          </p>
        </div>
      </section>
      <AmenitiesSection />
      <CtaBanner />
    </>
  )
}