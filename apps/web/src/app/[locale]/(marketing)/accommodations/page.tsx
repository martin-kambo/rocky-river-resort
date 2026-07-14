import type { Metadata } from 'next'
import { RoomCard }      from '../../../../components/rooms/RoomCard'
import { CtaBanner }     from '../../../../components/sections/CtaBanner'
import { apiClient }     from '../../../../lib/api-client'
import type { RoomType } from '@rrr/types'

export const metadata: Metadata = {
  title:       'Accommodations — Rocky River Resort',
  description: 'Explore four distinctive room types at Rocky River Resort — River Suite, Riverside Cottage, Savannah Room, and Family Villa.',
}

async function getRooms(): Promise<RoomType[]> {
  try {
    const res = await apiClient.get<{ data: RoomType[] }>('/rooms')
    return res.data.data
  } catch { return [] }
}

export default async function AccommodationsPage() {
  const rooms = await getRooms()

  return (
    <>
      <section className="bg-forest section-padding pt-32">
        <div className="container-narrow text-center">
          <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4">Where You Stay</p>
          <h1 className="font-serif text-5xl sm:text-6xl text-cream font-light mb-6">Accommodations</h1>
          <div className="w-16 h-px bg-gold mx-auto mb-6" />
          <p className="text-cream/70 text-lg max-w-xl mx-auto">
            Four room types, each designed to frame a different face of the landscape.
          </p>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-wide space-y-8">
          {rooms.length > 0
            ? rooms.map((room) => <RoomCard key={room.id} room={room} featured />)
            : (
              <div className="text-center py-20 text-sand">
                <p>Rooms loading… Please refresh or contact us directly.</p>
              </div>
            )}
        </div>
      </section>

      <CtaBanner />
    </>
  )
}