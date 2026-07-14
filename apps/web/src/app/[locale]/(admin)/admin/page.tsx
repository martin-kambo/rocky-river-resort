'use client'
import { useEffect, useState } from 'react'
import { useRouter }           from 'next/navigation'
import { useLocale }           from 'next-intl'
import { useAuth }             from '../../../../hooks/useAuth'
import { apiClient }           from '../../../../lib/api-client'
import { formatKes }           from '../../../../lib/utils'
import { Badge }               from '../../../../components/ui/badge'
import { Button }              from '../../../../components/ui/button'

interface Stats {
  monthBookings:   number
  occupiedTonight: number
  monthRevenueKes: number
  occupancyRate:   number
}

interface Booking {
  id:        string
  reference: string
  status:    string
  totalKes:  number
  checkIn:   string
  user:      { firstName: string; lastName: string; email: string }
  room:      { roomType: { nameEn: string } }
}

const statusVariant: Record<string, any> = {
  PENDING: 'warning', CONFIRMED: 'success', CANCELLED: 'error', COMPLETED: 'secondary',
}

export default function AdminPage() {
  const locale   = useLocale()
  const router   = useRouter()
  const { isAuthenticated, isAdmin } = useAuth()

  const [stats,    setStats]    = useState<Stats | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading,  setLoading]  = useState(true)
  const [tab,      setTab]      = useState<'overview' | 'bookings'>('overview')

  useEffect(() => {
    if (!isAuthenticated) { router.push(`/${locale}/login`); return }
    if (isAuthenticated && !isAdmin) { router.push(`/${locale}`); return }

    Promise.all([
      apiClient.get('/admin/bookings/stats'),
      apiClient.get('/admin/bookings?limit=20'),
    ]).then(([statsRes, bookingsRes]) => {
      setStats(statsRes.data.data)
      setBookings(bookingsRes.data.data.data)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [isAuthenticated, isAdmin, locale, router])

  const handleCleanup = async () => {
    const res = await apiClient.post('/admin/maintenance/cleanup-tokens')
    alert(`Cleaned up ${res.data.data.deleted} expired tokens`)
  }

  if (!isAuthenticated || !isAdmin) return null

  return (
    <>
      <section className="bg-forest section-padding pt-32">
        <div className="container-wide">
          <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4">Admin</p>
          <h1 className="font-serif text-4xl text-cream font-light">Dashboard</h1>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-wide">
          {/* Tabs */}
          <div className="flex gap-3 mb-8">
            {(['overview', 'bookings'] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-2 rounded text-sm font-medium capitalize transition-colors
                  ${tab === t ? 'bg-forest text-cream' : 'bg-white text-sand hover:text-forest'}`}>
                {t}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1,2,3,4].map((i) => <div key={i} className="bg-white rounded-lg h-24 animate-pulse" />)}
            </div>
          ) : tab === 'overview' ? (
            <>
              {/* Stats cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Bookings this month',  value: String(stats?.monthBookings   ?? 0) },
                  { label: 'Occupied tonight',      value: String(stats?.occupiedTonight ?? 0) },
                  { label: 'Revenue this month',    value: formatKes(stats?.monthRevenueKes ?? 0) },
                  { label: 'Occupancy rate',        value: `${stats?.occupancyRate ?? 0}%` },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white rounded-lg p-5 shadow-sm">
                    <p className="text-xs text-sand uppercase tracking-wider mb-2">{label}</p>
                    <p className="text-2xl font-light text-forest">{value}</p>
                  </div>
                ))}
              </div>

              {/* Maintenance */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="font-serif text-xl text-forest mb-4">Maintenance</h2>
                <Button onClick={handleCleanup} variant="outline" size="md">
                  Purge Expired Tokens
                </Button>
              </div>
            </>
          ) : (
            /* Bookings table */
            <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-cream">
                  <tr>
                    {['Reference','Guest','Room','Check-in','Status','Total',''].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs text-sand uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-cream/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-forest">{b.reference}</td>
                      <td className="px-4 py-3 text-earth">
                        {b.user.firstName} {b.user.lastName}
                        <p className="text-xs text-sand">{b.user.email}</p>
                      </td>
                      <td className="px-4 py-3 text-earth">{b.room?.roomType?.nameEn}</td>
                      <td className="px-4 py-3 text-earth">
                        {new Date(b.checkIn).toLocaleDateString('en-KE')}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={statusVariant[b.status]}>{b.status}</Badge>
                      </td>
                      <td className="px-4 py-3 text-earth">{formatKes(Number(b.totalKes))}</td>
                      <td className="px-4 py-3"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  )
}