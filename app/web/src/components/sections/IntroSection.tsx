export function IntroSection() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-narrow text-center">
        <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4">The Resort</p>
        <h2 className="font-serif text-4xl sm:text-5xl text-forest font-light mb-8">
          Where the River Meets the Wild
        </h2>
        <div className="w-16 h-px bg-gold mx-auto mb-8" />
        <p className="text-sand text-lg leading-relaxed max-w-2xl mx-auto mb-6">
          Perched on the banks of the Athi River in Thika East, Rocky River Resort offers
          an intimate escape where the rhythms of the natural world set the pace of your stay.
        </p>
        <p className="text-sand text-base leading-relaxed max-w-xl mx-auto">
          Four distinctive room types, each designed to frame the landscape — river views,
          forest canopy, pool vistas, and open savannah — invite you to reconnect with Kenya's
          extraordinary beauty without sacrificing comfort.
        </p>
      </div>
    </section>
  )
}