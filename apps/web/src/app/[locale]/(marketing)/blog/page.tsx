import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:       'Blog — Rocky River Resort',
  description: 'Stories, guides, and updates from Rocky River Resort and the wider Thika East region.',
}

const posts = [
  { slug: 'best-time-to-visit', title: 'Best Time to Visit Rocky River Resort', date: '2025-06-01',
    excerpt: 'Each season along the Athi River offers something unique — here\'s how to choose yours.' },
  { slug: 'athi-river-birdwatching', title: 'A Birdwatcher\'s Guide to the Athi River', date: '2025-05-15',
    excerpt: 'Over 140 species recorded on the estate. Our resident naturalist shares the highlights.' },
  { slug: 'thika-day-trips', title: 'Day Trips from Thika East', date: '2025-04-20',
    excerpt: 'Fourteen Falls, Ol Donyo Sabuk, and the coffee highlands — all within 60 minutes.' },
]

export default function BlogPage() {
  return (
    <>
      <section className="bg-forest section-padding pt-32">
        <div className="container-narrow text-center">
          <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4">Stories</p>
          <h1 className="font-serif text-5xl sm:text-6xl text-cream font-light">Journal</h1>
        </div>
      </section>
      <section className="section-padding bg-cream">
        <div className="container-narrow space-y-8">
          {posts.map(({ slug, title, date, excerpt }) => (
            <article key={slug} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs text-sand mb-2">{new Date(date).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <h2 className="font-serif text-2xl text-forest mb-3">{title}</h2>
              <p className="text-sand text-sm leading-relaxed">{excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}