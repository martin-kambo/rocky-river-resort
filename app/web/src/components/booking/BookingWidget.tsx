'use client'
import { useState }            from 'react'
import { useRouter }           from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useBookingStore }     from '../../stores/booking.store'
import { Button }              from '../ui/button'
import { Input }               from '../ui/input'

export function BookingWidget({ compact = false }: { compact?: boolean }) {
  const t       = useTranslations('booking')
  const locale  = useLocale()
  const router  = useRouter()
  const { search, setSearch } = useBookingStore()

  const today     = new Date().toISOString().split('T')[0]
  const tomorrow  = new Date(Date.now() + 86_400_000).toISOString().split('T')[0]

  const [checkIn,  setCheckIn]  = useState(search.checkIn  ?? today)
  const [checkOut, setCheckOut] = useState(search.checkOut ?? tomorrow)
  const [adults,   setAdults]   = useState(search.adults   ?? 2)

  const handleSearch = () => {
    setSearch({ checkIn, checkOut, adults })
    router.push(`/${locale}/book?checkIn=${checkIn}&checkOut=${checkOut}&guests=${adults}`)
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${compact ? '' : 'max-w-3xl'}`}>
      <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-4'}`}>
        <Input
          label={t('checkIn')}
          type="date"
          value={checkIn}
          min={today}
          onChange={(e) => setCheckIn(e.target.value)}
        />
        <Input
          label={t('checkOut')}
          type="date"
          value={checkOut}
          min={checkIn}
          onChange={(e) => setCheckOut(e.target.value)}
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-earth">{t('adults')}</label>
          <select
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className="w-full rounded border border-cream-dark bg-white px-3 py-2.5 text-sm text-earth
                       focus:border-gold focus:ring-1 focus:ring-gold outline-none"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? 'Adult' : 'Adults'}</option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <Button onClick={handleSearch} className="w-full" size="lg">
            {t('searchRooms')}
          </Button>
        </div>
      </div>
    </div>
  )
}