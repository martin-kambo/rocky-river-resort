'use client'
import { useEffect, useState } from 'react'
import { useRouter }           from 'next/navigation'
import { useLocale }           from 'next-intl'
import { useAuth }             from '../../../../hooks/useAuth'
import { Input }               from '../../../../components/ui/input'
import { Button }              from '../../../../components/ui/button'
import { apiClient, getApiError } from '../../../../lib/api-client'
import { useAuthStore }        from '../../../../stores/auth.store'

export default function ProfilePage() {
  const locale   = useLocale()
  const router   = useRouter()
  const { user, isAuthenticated } = useAuth()
  const setAuth  = useAuthStore((s) => s.setAuth)

  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '', nationality: '', preferredLocale: 'en',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error,   setError]   = useState('')

  useEffect(() => {
    if (!isAuthenticated) { router.push(`/${locale}/login`); return }
    if (user) {
      setForm({
        firstName:       user.firstName       ?? '',
        lastName:        user.lastName        ?? '',
        phone:           user.phone           ?? '',
        nationality:     user.nationality     ?? '',
        preferredLocale: user.preferredLocale ?? 'en',
      })
    }
  }, [isAuthenticated, user, locale, router])

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSave = async () => {
    setLoading(true); setError(''); setSuccess(false)
    try {
      const res = await apiClient.patch('/users/me', form)
      setSuccess(true)
    } catch (e) {
      setError(getApiError(e))
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) return null

  return (
    <>
      <section className="bg-forest section-padding pt-32">
        <div className="container-narrow">
          <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4">Your Account</p>
          <h1 className="font-serif text-4xl text-cream font-light">Profile</h1>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-narrow max-w-lg">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="font-serif text-xl text-forest mb-6">Personal Details</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="First name" value={form.firstName} onChange={set('firstName')} />
                <Input label="Last name"  value={form.lastName}  onChange={set('lastName')}  />
              </div>
              <Input label="Email" type="email" value={user?.email ?? ''} disabled
                hint="Email cannot be changed" />
              <Input label="Phone" type="tel" placeholder="+254712345678"
                value={form.phone} onChange={set('phone')} />
              <Input label="Nationality (ISO 3166-1 alpha-3)" placeholder="KEN"
                value={form.nationality} onChange={set('nationality')} />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-earth">Preferred language</label>
                <select value={form.preferredLocale}
                  onChange={(e) => setForm((f) => ({ ...f, preferredLocale: e.target.value }))}
                  className="w-full rounded border border-cream-dark bg-white px-3 py-2.5 text-sm
                             text-earth focus:border-gold focus:ring-1 focus:ring-gold outline-none">
                  <option value="en">English</option>
                  <option value="sw">Kiswahili</option>
                </select>
              </div>

              {success && <p className="text-green-600 text-sm">Profile updated successfully.</p>}
              {error   && <p className="text-red-500 text-sm">{error}</p>}

              <Button onClick={handleSave} loading={loading} size="lg" className="w-full">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}