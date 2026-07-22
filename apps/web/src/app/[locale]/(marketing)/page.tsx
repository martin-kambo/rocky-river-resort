import type { Metadata }         from 'next'
import { HeroSection }           from '@/components/sections/HeroSection'
import { IntroSection }          from '@/components/sections/IntroSection'
import { RoomsSection }          from '@/components/sections/RoomsSection'
import { AmenitiesSection }      from '@/components/sections/AmenitiesSection'
import { ExperiencesSection }    from '@/components/sections/ExperiencesSection'
import { RiverSceneSection }     from 'components/sections/RiverSceneSection'
import { TestimonialsSection }   from '@/components/sections/TestimonialsSection'
import { CtaBanner }             from '@/components/sections/CtaBanner'

export const metadata: Metadata = {
  title:       'Rocky River Resort — Luxury Nature Retreat, Thika East, Kenya',
  description: 'Escape to Rocky River Resort along the Athi River. Luxury rooms, world-class dining, and authentic Kenyan experiences from KES 18,000 per night.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <RoomsSection />
      <AmenitiesSection />
      <ExperiencesSection />
      <TestimonialsSection />
      <RiverSceneSection />
      <CtaBanner />
    </>
  )
}