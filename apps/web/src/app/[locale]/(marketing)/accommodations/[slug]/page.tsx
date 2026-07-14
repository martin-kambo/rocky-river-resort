import type { Metadata }  from 'next'
import Image              from 'next/image'
import { notFound }       from 'next/navigation'
import { getLocale }      from 'next-intl/server'
import { apiClient }      from '../../../../../lib/api-client'
import { formatKes }      from '../../../../../lib/utils'
import { AmenityIcon }    from '../../../../../components/rooms/AmenityIcon'
import { BookingWidget }  from '../../../../../components/booking/BookingWidget'
import { CtaBanner }      from '../../../../../components/sections/CtaBanner'
import type { RoomType }  from '@rrr/types'

interface Props { params: { slug: string; locale: string } }

async function getRoom(slug: string): Promise<RoomType | null> {
  try {
    const res = await apiClient.get<{ data: RoomType }>(`/rooms/${slug}`)
    return res.data.data
  } catch { return null }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const room = await getRoom(params.slug)
  if (!room) return { title: 'Room Not Found' }
  return {
    title:       `${room.nameEn} — Rocky River Resort`,
    description: room.descriptionEn,
  }
}

export default async function RoomDetailPage({ params }: Props) {
  const room   = await getRoom(params.slug)
  const locale = await getLocale()
  if (!room) notFound()

  const hero   = room.images.find((i) => i.isHero) ?? room.images[0]
  const others = room.images.filter((i) => !i.isHero).slice(0, 3)

  return (
    <>
      {/* Hero image */}
      <div className="relative h-[60vh] bg-forest mt-16">
        {hero ? (
          <Image src={hero.url} alt={hero.altEn} fill className="object-cover" priority />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-forest to-earth" />
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-8 left-0 right-0 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-gold text-xs tracking-widest uppercase mb-2">
              {formatKes(Number(room.basePriceKes))} / night
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl text-cream font-light">
              {room.nameEn}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left — description + amenities */}
            <div className="lg:col-span-2">
              <div className="flex gap-6 mb-8 text-sm text-sand">
                <span>Up to {room.maxOccupancy} guests</span>
                <span>·</span>
                <span>{Number(room.sizeSqm)}m²</span>
              </div>
              <p className="text-sand text-lg leading-relaxed mb-8">{room.descriptionEn}</p>
              <h2 className="font-serif text-2xl text-forest mb-5">Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {room.amenities.map((a) => (
                  <AmenityIcon key={a} name={a} />
                ))}
              </div>
              {others.length > 0 && (
                <div className="mt-10 grid grid-cols-3 gap-3">
                  {others.map((img) => (
                    <div key={img.id} className="relative h-40 rounded overflow-hidden bg-cream-dark">
                      <Image src={img.url} alt={img.altEn} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right — booking widget */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                  <p className="text-xs text-sand uppercase tracking-wider mb-1">From</p>
                  <p className="text-2xl font-medium text-forest mb-1">
                    {formatKes(Number(room.basePriceKes))}
                    <span className="text-sm font-normal text-sand ml-1">/ night</span>
                  </p>
                  <p className="text-xs text-sand mb-5">incl. 16% VAT</p>
                  <BookingWidget compact />
                </div>
                <p className="text-xs text-sand text-center">
                  Free cancellation 48 hours before check-in
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  )
}