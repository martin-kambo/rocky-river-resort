'use client'
import Image     from 'next/image'
import { useState } from 'react'

const images = [
  { src: '/images/river.jpg',      alt: 'The Athi River flowing beside the resort',           label: 'The River'      },
  { src: '/images/pool.jpg',       alt: 'Infinity pool overlooking the river',                label: 'Infinity Pool'  },
  { src: '/images/pool1.jpg',      alt: 'Pool terrace at sunset',                             label: 'Pool Terrace'   },
  { src: '/images/pool-2.jpg',     alt: 'Pool area surrounded by lush gardens',               label: 'Pool Garden'    },
  { src: '/images/restaurant.jpg', alt: 'Athi Restaurant dining area',                        label: 'Restaurant'     },
  { src: '/images/meal.jpg',       alt: 'Farm-to-table cuisine at Rocky River Resort',        label: 'Cuisine'        },
  { src: '/images/breakfast.jpg',  alt: 'Morning breakfast spread at the resort',             label: 'Breakfast'      },
  { src: '/images/lounge.jpg',     alt: 'The resort lounge and common areas',                 label: 'Lounge'         },
  { src: '/images/night.jpg',      alt: 'Rocky River Resort at night under the stars',        label: 'Night at RRR'   },
  { src: '/images/gallery-1.jpg',  alt: 'Rocky River Resort grounds and gardens',             label: 'Gardens'        },
  { src: '/images/gallery-2.jpg',  alt: 'Rocky River Resort scenic views',                   label: 'Scenic Views'   },
]

export default function GalleryPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [selectedAlt, setSelectedAlt] = useState('')

  const open = (src: string, alt: string) => { setSelected(src); setSelectedAlt(alt) }
  const close = () => setSelected(null)

  return (
    <>
      <section className="bg-forest section-padding pt-32">
        <div className="container-narrow text-center">
          <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4">The Resort</p>
          <h1 className="font-serif text-5xl sm:text-6xl text-cream font-light">Gallery</h1>
          <p className="text-cream/60 text-base mt-4 max-w-md mx-auto">
            A glimpse of life along the Athi River
          </p>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-wide">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map(({ src, alt, label }) => (
              <button
                key={src}
                onClick={() => open(src, alt)}
                className="w-full break-inside-avoid rounded overflow-hidden
                           hover:opacity-90 transition-opacity group relative"
              >
                <Image
                  src={src} alt={alt}
                  width={600} height={450}
                  className="w-full object-cover"
                  sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t
                                from-earth/80 to-transparent p-3 opacity-0
                                group-hover:opacity-100 transition-opacity">
                  <p className="text-cream text-xs font-medium">{label}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={close}
        >
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white
                       text-2xl w-10 h-10 flex items-center justify-center
                       rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            onClick={close}
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <Image
            src={selected} alt={selectedAlt}
            width={1200} height={900}
            className="max-h-[90vh] w-auto object-contain rounded"
            onClick={(e) => e.stopPropagation()}
            quality={95}
          />
        </div>
      )}
    </>
  )
}