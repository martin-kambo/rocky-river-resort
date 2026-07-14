'use client'
import { useEffect }       from 'react'
import Link                from 'next/link'
import { useRouter }       from 'next/navigation'
import { useLocale }       from 'next-intl'
import { useAuth }         from '../../../../hooks/useAuth'
import { useMyBookings, useCancelBooking } from '../../../../hooks/useBookings'
import { Badge }           from '../../../../components/ui/badge'
import { Button }          from '../../../../components/ui/button'
import { formatKes, formatDate } from '../../../../lib/utils'

const statusVariant: Record<string, 'default' | 'success' | 'warning' | 'error' | 'secondary'> = {
  PENDING:   'warning',
  CONFIRMED: 'success',
  CANCELLED: 'error',
  COMPLETED: 'secondary',
}

export default function MyBookingsPage() {
  const locale   = useLocale()
  const router   = useRouter()
  const { isAuthenticated } = useAuth()
  const { data: bookings, isLoading } = useMyBookings()
  const { mutate: cancel, isPending: cancelling } = useCancelBooking()

  useEffect(() => {
    if (!isAuthenticated) router.push(`/${locale}/login`)
  }, [isAuthenticated, locale, router])

  if (!isAuthenticated) return null

  return (
    <>
      <section className="bg-forest section-padding pt-32">
        <div className="container-narrow">
          <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4">Your Account</p>
          <h1 className="font-serif text-4xl sm:text-5xl text-cream font-light">My Bookings</h1>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-narrow">
          {isLoading ? (
            <div className="space-y-4">
              {[1,2,3].map((i) => (
                <div key={i} className="bg-white rounded-lg h-32 animate-pulse" />
              ))}
            </div>
          ) : !bookings?.length ? (
            <div className="text-center py-20">
              <p className="text-sand mb-6">You have no bookings yet.</p>
              <Button asChild variant="primary" size="lg">
                <Link href={`/${locale}/book`}>Make a Reservation</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div key={b.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs text-sand mb-1">Reference</p>
                      <p className="font-medium text-forest text-lg">{b.reference}</p>
                    </div>
                    <Badge variant={statusVariant[b.status] ?? 'default'}>{b.status}</Badge>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
                    <div><p className="text-sand text-xs">Room</p><p className="text-earth font-medium">{b.room?.roomType?.nameEn ?? '—'}</p></div>
                    <div><p className="text-sand text-xs">Check-in</p><p className="text-earth font-medium">{formatDate(b.checkIn)}</p></div>
                    <div><p className="text-sand text-xs">Check-out</p><p className="text-earth font-medium">{formatDate(b.checkOut)}</p></div>
                    <div><p className="text-sand text-xs">Total</p><p className="text-earth font-medium">{formatKes(Number(b.totalKes))}</p></div>
                  </div>
                  {b.status === 'PENDING' || b.status === 'CONFIRMED' ? (
                    <Button
                      variant="outline" size="sm"
                      onClick={() => { if (confirm('Cancel this booking?')) cancel(b.id) }}
                      loading={cancelling}
                    >
                      Cancel Booking
                    </Button>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}