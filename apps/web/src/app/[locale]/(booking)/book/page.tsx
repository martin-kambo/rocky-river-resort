'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useLocale }                  from 'next-intl'
import { useState }                   from 'react'
import { useRooms }                   from '../../../../hooks/useRooms'
import { useAuth }                    from '../../../../hooks/useAuth'
import { useAvailability }            from '../../../../hooks/useAvailability'
import { useBookingStore }            from '../../../../stores/booking.store'
import { RoomCard }                   from '@/components/rooms/RoomCard'
import { BookingWidget }              from '@/components/booking/BookingWidget'
import { apiClient }                  from '@/lib/api-client'
import { getApiError }                from '@/lib/api-client'
import { Button }                     from '@/components/ui/button'
import { formatKes }                  from '@/lib/utils'

export default function BookPage() {
  const sp        = useSearchParams()
  const locale    = useLocale()
  const router    = useRouter()
  const { isAuthenticated } = useAuth()
  const { data: rooms }     = useRooms()
  const { search, setSearch } = useBookingStore()

  const checkIn  = sp.get('checkIn')  ?? search.checkIn  ?? ''
  const checkOut = sp.get('checkOut') ?? search.checkOut ?? ''
  const guests   = Number(sp.get('guests') ?? search.adults ?? 2)

  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [loading,      setLoading]      = useState(false)
  const [error,        setError]        = useState('')

  const { data: avail } = useAvailability(
    selectedSlug && checkIn && checkOut
      ? { roomTypeSlug: selectedSlug, checkIn, checkOut, guests }
      : null,
  )

  const handleBook = async () => {
    if (!isAuthenticated) {
      router.push(`/${locale}/login?redirect=/${locale}/book`)
      return
    }
    if (!selectedSlug || !checkIn || !checkOut) return
    setLoading(true); setError('')
    try {
      const res = await apiClient.post('/bookings', {
        roomTypeSlug: selectedSlug, checkIn, checkOut, adults: guests,
      })
      router.push(`/${locale}/checkout?bookingId=${res.data.data.id}`)
    } catch (e) {
      setError(getApiError(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="bg-forest section-padding pt-32">
        <div className="container-narrow text-center">
          <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4">Reservations</p>
          <h1 className="font-serif text-5xl text-cream font-light">Book Your Stay</h1>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-wide">
          <div className="mb-10"><BookingWidget /></div>

          {checkIn && checkOut ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rooms?.map((room) => (
                <div
                  key={room.id}
                  onClick={() => setSelectedSlug(room.slug)}
                  className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all
                    ${selectedSlug === room.slug ? 'border-gold shadow-lg' : 'border-transparent'}`}
                >
                  <RoomCard room={room} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-sand py-12">Enter your dates above to see availability.</p>
          )}

          {selectedSlug && avail && (
            <div className="mt-8 bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sand text-sm">Subtotal</span>
                <span className="text-earth font-medium">{formatKes(avail.subtotalKes)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sand text-sm">VAT (16%)</span>
                <span className="text-earth font-medium">{formatKes(avail.vatKes)}</span>
              </div>
              <div className="flex justify-between items-center border-t pt-3 mb-5">
                <span className="text-earth font-medium">Total</span>
                <span className="text-forest text-xl font-medium">{formatKes(avail.totalKes)}</span>
              </div>
              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
              <Button onClick={handleBook} loading={loading} size="lg" className="w-full">
                {isAuthenticated ? 'Confirm & Proceed to Payment' : 'Sign in to Book'}
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}