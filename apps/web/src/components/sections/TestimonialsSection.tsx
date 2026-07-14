const testimonials = [
  {
    name:    'Wanjiru K.',
    country: 'Kenya',
    rating:  5,
    text:    'Waking up to the sound of the river every morning was worth every shilling. The River Suite is perfection — we\'ll be back for Christmas.',
  },
  {
    name:    'James O.',
    country: 'UK',
    rating:  5,
    text:    'I travel extensively for work across Africa. Rocky River Resort is among the finest boutique properties I\'ve experienced. The food was outstanding.',
  },
  {
    name:    'Fatuma A.',
    country: 'Tanzania',
    rating:  5,
    text:    'Our family stayed in the Villa and it was magical. The children loved the play deck and the staff made everyone feel so welcome.',
  },
]

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-earth">
      <div className="container-wide">
        <div className="text-center mb-12">
          <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4">Guest Stories</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-cream font-light">
            Heard From Our Guests
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ name, country, rating, text }) => (
            <div key={name} className="bg-earth-light/20 rounded-lg p-6 border border-earth-light/10">
              <div className="flex mb-4">
                {Array.from({ length: rating }).map((_, i) => (
                  <span key={i} className="text-gold text-sm">★</span>
                ))}
              </div>
              <p className="text-cream/70 text-sm leading-relaxed mb-6 italic">"{text}"</p>
              <div>
                <p className="text-cream text-sm font-medium">{name}</p>
                <p className="text-cream/40 text-xs">{country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}