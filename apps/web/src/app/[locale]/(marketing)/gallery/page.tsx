'use client'
import { useState }  from 'react'
import { useRooms }  from '../../../../hooks/useRooms'
import Image         from 'next/image'

export default function GalleryPage() {
  const { data: rooms } = useRooms()
  const [selected, setSelected] = useState<string | null>(null)

  const allImages = rooms?.flatMap((r) =>
    r.images.map((img) => ({ ...img, roomName: r.nameEn }))
  ) ?? []

  return (
    <>
      <section className="bg-forest section-padding pt-32">
        <div className="container-narrow text-center">
          <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4">The Resort</p>
          <h1 className="font-serif text-5xl sm:text-6xl text-cream font-light">Gallery</h1>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-wide">
          {allImages.length === 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="aspect-square bg-cream-dark rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {allImages.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelected(img.url)}
                  className="w-full break-inside-avoid rounded overflow-hidden hover:opacity-90
                             transition-opacity focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  <Image
                    src={img.url} alt={img.altEn}
                    width={400} height={300}
                    className="w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl"
            onClick={() => setSelected(null)}
          >
            ✕
          </button>
          <Image
            src={selected} alt="Gallery image"
            width={1200} height={800}
            className="max-h-[90vh] w-auto object-contain rounded"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}