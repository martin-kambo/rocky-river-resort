const experiences = [
  { title: 'Sunrise Kayak',   duration: '2 hours', desc: 'Glide down the Athi at first light, watching hippos and kingfishers wake.' },
  { title: 'Bush Dinner',     duration: '3 hours', desc: 'A candlelit five-course dinner set beneath the fever trees on the river\'s edge.' },
  { title: 'Coffee Plantation Tour', duration: '4 hours', desc: 'Explore Thika\'s legendary coffee farms and taste single-origin brews at source.' },
  { title: 'Night Safari',    duration: '3 hours', desc: 'Spot nocturnal wildlife on a guided drive through the Ol Donyo Sabuk foothills.' },
]

export function ExperiencesSection() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-wide">
        <div className="text-center mb-12">
          <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4">Curated Experiences</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-forest font-light">
            Stories Worth Telling
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.map(({ title, duration, desc }) => (
            <div key={title}
              className="flex gap-5 bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-1 bg-gold rounded-full shrink-0" />
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-serif text-forest text-lg">{title}</h3>
                  <span className="text-xs text-sand bg-cream px-2 py-0.5 rounded">{duration}</span>
                </div>
                <p className="text-sand text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}