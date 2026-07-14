'use client'
import Link              from 'next/link'
import { useLocale }     from 'next-intl'
import { useEffect, useState } from 'react'
import { apiClient }     from '../../../../../lib/api-client'
import { formatKes, formatDate } from '../../../../../lib/utils'
import type { Booking }  from '@rrr/types'

interface Props { params: { ref: string } }

export default function ConfirmationPage({ params }: Props) {
  const locale = useLocale()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiClient.get<{ data: Booking }>(`/bookings/ref/${params.ref}`)
      .then((r) => setBooking(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [params.ref])

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-2 border-forest border-t-gold animate-spin" />
      </div>
    )
  }

  return (
    <section className="min-h-screen bg-cream section-padding pt-32">
      <div className="max-w-lg mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <p className="text-gold text-xs tracking-widest uppercase mb-3">Booking Confirmed</p>
        <h1 className="font-serif text-4xl text-forest font-light mb-2">You're going to the river</h1>

        {booking && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-8 text-left space-y-3">
            <div className="text-center mb-4">
              <p className="text-xs text-sand uppercase tracking-wider">Reference</p>
              <p className="text-2xl font-light text-forest">{booking.reference}</p>
            </div>
            {[
              ['Room',       booking.room?.roomType?.nameEn ?? '—'],
              ['Check-in',   formatDate(booking.checkIn)],
              ['Check-out',  formatDate(booking.checkOut)],
              ['Nights',     String(booking.nights)],
              ['Guests',     String(booking.adults)],
              ['Total',      formatKes(Number(booking.totalKes))],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm border-t pt-3">
                <span className="text-sand">{label}</span>
                <span className="text-earth font-medium">{value}</span>
              </div>
            ))}
          </div>
        )}

        <p className="text-sand text-sm mt-6 mb-8">
          A confirmation email has been sent to your registered email address.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href={`/${locale}/my-bookings`}
            className="inline-flex items-center justify-center px-6 py-3 bg-gold text-earth
                       rounded font-medium hover:bg-gold-dark transition-colors">
            View My Bookings
          </Link>
          <Link href={`/${locale}`}
            className="inline-flex items-center justify-center px-6 py-3 border border-sand
                       text-sand rounded font-medium hover:border-forest hover:text-forest transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    </section>
  )
}