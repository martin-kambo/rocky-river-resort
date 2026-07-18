'use client'
import Link                           from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { useState }                   from 'react'
import { apiClient, getApiError }     from '@/lib/api-client'
import { Input }                      from '@/components/ui/input'
import { Button }                     from '@/components/ui/button'

export default function ForgotPasswordPage() {
  const t      = useTranslations('auth')
  const locale = useLocale()

  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [error,   setError]   = useState('')

  const handleSubmit = async () => {
    if (!email) { setError('Please enter your email address'); return }
    setLoading(true); setError('')
    try {
      await apiClient.post('/auth/forgot-password', { email })
      setSent(true)
    } catch (e) {
      // Do not reveal whether the email exists — show success regardless
      setSent(true)
      console.error(getApiError(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-forest font-light">Rocky River Resort</h1>
          <p className="text-sand text-sm mt-1">{t('forgotPassword')}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-serif text-xl text-forest mb-2">Check your inbox</h2>
              <p className="text-sand text-sm mb-6">
                If an account exists for {email}, you'll receive a password reset link shortly.
              </p>
              <Link href={`/${locale}/login`}
                className="text-gold hover:text-gold-dark text-sm transition-colors">
                Back to sign in
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sand text-sm mb-2">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <Input
                label={t('email')} type="email" autoComplete="email"
                value={email} onChange={(e) => setEmail(e.target.value)} required
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button onClick={handleSubmit} loading={loading} size="lg" className="w-full">
                {t('sendResetLink')}
              </Button>
              <p className="text-center text-sm text-sand">
                <Link href={`/${locale}/login`}
                  className="text-gold hover:text-gold-dark transition-colors">
                  Back to sign in
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}