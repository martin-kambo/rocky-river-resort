import type { Metadata } from 'next'
import { CtaBanner }     from '../../../../components/sections/CtaBanner'

export const metadata: Metadata = {
  title:       'About Us — Rocky River Resort',
  description: 'Learn the story of Rocky River Resort — a family-owned luxury nature retreat perched on the Athi River in Thika East, Kenya.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-forest section-padding pt-32">
        <div className="container-narrow text-center">
          <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4">Our Story</p>
          <h1 className="font-serif text-5xl sm:text-6xl text-cream font-light mb-6">
            Born From the River
          </h1>
          <div className="w-16 h-px bg-gold mx-auto mb-8" />
          <p className="text-cream/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Rocky River Resort was founded by the Kamau family with a single conviction:
            that luxury and the natural world are not at odds — they are at their best when together.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-cream">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-forest/10 rounded-lg h-80 flex items-center justify-center text-forest/30 text-sm">
              [Resort Photography]
            </div>
            <div>
              <h2 className="font-serif text-3xl text-forest mb-6">The Land</h2>
              <p className="text-sand leading-relaxed mb-4">
                The twelve-acre estate has been in the Kamau family for three generations.
                What began as farmland gradually revealed its true calling when the first guests
                arrived in 2018 — drawn by the river, the birdsong, and a stillness increasingly
                rare in modern Kenya.
              </p>
              <p className="text-sand leading-relaxed">
                Today, Rocky River Resort stewards the land with the same care it has always
                received. Native trees have been replanted, the riverbank restored, and the
                resort runs on 60% solar energy. We believe the land must benefit from our
                presence, not merely endure it.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-20">
            <div className="order-2 lg:order-1">
              <h2 className="font-serif text-3xl text-forest mb-6">The Team</h2>
              <p className="text-sand leading-relaxed mb-4">
                Every member of our 45-person team is drawn from the surrounding communities
                of Thika East and Kiambu County. Many grew up along this stretch of the
                Athi River. Their knowledge of the land, its seasons, and its stories is the
                single thing no renovation budget can replicate.
              </p>
              <p className="text-sand leading-relaxed">
                We invest in continuous training, fair wages, and community programmes that
                ensure the resort's growth is shared broadly — because a resort that serves
                only its guests serves no one for long.
              </p>
            </div>
            <div className="order-1 lg:order-2 bg-forest/10 rounded-lg h-80 flex items-center
                            justify-center text-forest/30 text-sm">
              [Team Photography]
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl text-forest">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { title: 'Conservation', desc: 'Native planting, solar energy, and zero single-use plastics across the estate.' },
              { title: 'Community',    desc: 'All staff sourced locally. 5% of revenue funds Thika East bursaries.' },
              { title: 'Craft',        desc: 'Every detail — from the menu to the linens — is chosen with intention.' },
            ].map(({ title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-12 h-px bg-gold mx-auto mb-6" />
                <h3 className="font-serif text-xl text-forest mb-3">{title}</h3>
                <p className="text-sand text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}