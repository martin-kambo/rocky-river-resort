'use client'
import Link                           from 'next/link'
import { useRouter }                  from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useState }                   from 'react'
import { useAuth }                    from '../../../../hooks/useAuth'
import { Input }                      from '../../../../components/ui/input'
import { Button }                     from '../../../../components/ui/button'
import { getApiError }                from '../../../../lib/api-client'

export default function RegisterPage() {
  const t      = useTranslations('auth')
  const locale = useLocale()
  const router = useRouter()
  const { register } = useAuth()

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', phone: '',
  })
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.firstName || !form.email || !form.password) {
      setError('Please fill in all required fields')
      return
    }
    setLoading(true); setError('')
    try {
      await register(form.email, form.password, form.firstName, form.lastName)
      router.push(`/${locale}/my-bookings`)
    } catch (e) {
      setError(getApiError(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-forest font-light">Rocky River Resort</h1>
          <p className="text-sand text-sm mt-1">{t('signUp')}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input label={t('firstName')} value={form.firstName} onChange={set('firstName')} required />
              <Input label={t('lastName')}  value={form.lastName}  onChange={set('lastName')} />
            </div>
            <Input label={t('email')} type="email" autoComplete="email"
              value={form.email} onChange={set('email')} required />
            <Input label={t('password')} type="password" autoComplete="new-password"
              value={form.password} onChange={set('password')} required
              hint="Minimum 8 characters" />
            <Input label={t('phone')} type="tel" placeholder="+254712345678"
              value={form.phone} onChange={set('phone')} />

            {error && (
              <div className="bg-red-50 border border-red-200 rounded p-3">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <p className="text-xs text-sand">
              By creating an account you agree to our{' '}
              <Link href={`/${locale}/terms`} className="text-gold">Terms of Service</Link>{' '}
              and{' '}
              <Link href={`/${locale}/privacy`} className="text-gold">Privacy Policy</Link>.
            </p>

            <Button onClick={handleSubmit} loading={loading} size="lg" className="w-full">
              {t('signUp')}
            </Button>
          </div>

          <p className="text-center text-sm text-sand mt-6">
            {t('hasAccount')}{' '}
            <Link href={`/${locale}/login`} className="text-gold hover:text-gold-dark transition-colors">
              {t('signIn')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}