import { notFound }  from 'next/navigation'
import type { Metadata } from 'next'

interface Props { params: { slug: string } }

const posts: Record<string, { title: string; date: string; content: string }> = {
  'best-time-to-visit': {
    title:   'Best Time to Visit Rocky River Resort',
    date:    '2025-06-01',
    content: 'The Athi River changes character with the seasons. The long rains (March–May) bring lush greenery and the best birdwatching. The dry months (June–October) offer clear skies and cooler temperatures ideal for walking and wildlife. December through February are peak season — book early.',
  },
  'athi-river-birdwatching': {
    title:   'A Birdwatcher\'s Guide to the Athi River',
    date:    '2025-05-15',
    content: 'Our estate sits within a riparian corridor that supports over 140 recorded species. Malachite Kingfishers, African Fish Eagles, and Hamerkops are daily sightings. Our resident naturalist leads dawn walks every Tuesday and Saturday — included for all guests.',
  },
  'thika-day-trips': {
    title:   'Day Trips from Thika East',
    date:    '2025-04-20',
    content: 'Fourteen Falls is a 20-minute drive. Ol Donyo Sabuk National Park, home to buffalo and over 200 bird species, is 45 minutes away. The Kiambu coffee belt — where some of Kenya\'s finest single-origin beans are grown — begins just 30 minutes south.',
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = posts[params.slug]
  if (!post) return { title: 'Post Not Found' }
  return { title: `${post.title} — Rocky River Resort Blog` }
}

export default function BlogPostPage({ params }: Props) {
  const post = posts[params.slug]
  if (!post) notFound()

  return (
    <>
      <section className="bg-forest section-padding pt-32">
        <div className="container-narrow text-center">
          <p className="text-gold text-xs tracking-widest uppercase mb-4">
            {new Date(post.date).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-cream font-light">{post.title}</h1>
        </div>
      </section>
      <section className="section-padding bg-cream">
        <div className="container-narrow max-w-2xl">
          <div className="prose prose-stone max-w-none">
            <p className="text-sand text-lg leading-relaxed">{post.content}</p>
          </div>
        </div>
      </section>
    </>
  )
}