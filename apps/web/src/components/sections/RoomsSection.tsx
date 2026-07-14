'use client'
import Link           from 'next/link'
import { useLocale }  from 'next-intl'
import { useRooms }   from '../../hooks/useRooms'
import { RoomCard }   from '../rooms/RoomCard'
import { Button }     from '../ui/button'

export function RoomsSection() {
  const { data: rooms, isLoading } = useRooms()
  const locale = useLocale()

  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="text-center mb-12">
          <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4">Accommodations</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-forest font-light">
            Your River Retreat
          </h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1,2,3,4].map((i) => (
              <div key={i} className="bg-cream-dark rounded-lg h-64 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rooms?.slice(0, 4).map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg">
            <Link href={`/${locale}/accommodations`}>View All Accommodations</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
