'use client'
import Link                        from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useState }                from 'react'
import { useAuth }                 from '../../../../hooks/useAuth'
import { Input }                   from '@/components/ui/input'
import { Button }                  from '@/components/ui/button'
import { getApiError }             from '@/lib/api-client'

export default function LoginPage() {
  const t        = useTranslations('auth')
  const locale   = useLocale()
  const router   = useRouter()
  const sp       = useSearchParams()
  const redirect = sp.get('redirect') ?? `/${locale}/my-bookings`
  const { login } = useAuth()

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  const handleSubmit = async () => {
    if (!email || !password) { setError('Please enter your email and password'); return }
    setLoading(true); setError('')
    try {
      await login(email, password)
      router.push(redirect)
    } catch (e) {
      setError(getApiError(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-forest font-light">Rocky River Resort</h1>
          <p className="text-sand text-sm mt-1">{t('signIn')}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="space-y-4">
            <Input
              label={t('email')} type="email" autoComplete="email"
              value={email} onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label={t('password')} type="password" autoComplete="current-password"
              value={password} onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex justify-end">
              <Link href={`/${locale}/forgot-password`}
                className="text-xs text-gold hover:text-gold-dark transition-colors">
                {t('forgotPassword')}
              </Link>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded p-3">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <Button
              onClick={handleSubmit}
              loading={loading}
              size="lg"
              className="w-full"
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            >
              {t('signIn')}
            </Button>
          </div>

          <p className="text-center text-sm text-sand mt-6">
            {t('noAccount')}{' '}
            <Link href={`/${locale}/register`} className="text-gold hover:text-gold-dark transition-colors">
              {t('signUp')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}