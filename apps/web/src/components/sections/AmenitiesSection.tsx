const amenities = [
  { icon: '🏊', title: 'Infinity Pool',    desc: 'River-facing infinity pool open sunrise to sunset' },
  { icon: '🍽️', title: 'Athi Restaurant', desc: 'Farm-to-table Kenyan cuisine and international dishes' },
  { icon: '💆', title: 'Riverside Spa',   desc: 'Treatments inspired by indigenous botanical traditions' },
  { icon: '🚣', title: 'Water Sports',    desc: 'Kayaking, fishing, and guided river walks' },
  { icon: '🔥', title: 'Bush Bonfires',   desc: 'Nightly bonfires on the riverbank under open skies' },
  { icon: '🌿', title: 'Nature Walks',    desc: 'Guided birding and wildlife trails through riverine forest' },
]

export function AmenitiesSection() {
  return (
    <section className="section-padding bg-forest">
      <div className="container-wide">
        <div className="text-center mb-12">
          <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4">The Experience</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-cream font-light">
            More Than a Room
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map(({ icon, title, desc }) => (
            <div key={title}
              className="bg-forest-light/30 rounded-lg p-6 border border-forest-light/20
                         hover:border-gold/30 transition-colors">
              <div className="text-3xl mb-4">{icon}</div>
              <h3 className="font-serif text-cream text-lg mb-2">{title}</h3>
              <p className="text-cream/60 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}