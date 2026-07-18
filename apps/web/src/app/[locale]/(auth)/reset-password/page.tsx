'use client'
import Link                           from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useState }                   from 'react'
import { apiClient, getApiError }     from '@/lib/api-client'
import { Input }                      from '@/components/ui/input'
import { Button }                     from '@/components/ui/button'

export default function ResetPasswordPage() {
  const t        = useTranslations('auth')
  const locale   = useLocale()
  const router   = useRouter()
  const sp       = useSearchParams()
  const token    = sp.get('token') ?? ''

  const [password,  setPassword]  = useState('')
  const [confirm,   setConfirm]   = useState('')
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState('')
  const [success,   setSuccess]   = useState(false)

  const handleSubmit = async () => {
    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    if (!token) {
      setError('Invalid or missing reset token')
      return
    }

    setLoading(true); setError('')
    try {
      await apiClient.post('/auth/reset-password', { token, password })
      setSuccess(true)
      setTimeout(() => router.push(`/${locale}/login`), 3000)
    } catch (e) {
      setError(getApiError(e))
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-sand mb-4">Invalid reset link.</p>
          <Link href={`/${locale}/forgot-password`} className="text-gold">Request a new one</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-forest font-light">Rocky River Resort</h1>
          <p className="text-sand text-sm mt-1">{t('resetPassword')}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          {success ? (
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-serif text-xl text-forest mb-2">Password updated</h2>
              <p className="text-sand text-sm">Redirecting you to sign in…</p>
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                label="New password" type="password" autoComplete="new-password"
                value={password} onChange={(e) => setPassword(e.target.value)}
                hint="Minimum 8 characters" required
              />
              <Input
                label="Confirm password" type="password" autoComplete="new-password"
                value={confirm} onChange={(e) => setConfirm(e.target.value)} required
              />
              {error && (
                <div className="bg-red-50 border border-red-200 rounded p-3">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
              <Button onClick={handleSubmit} loading={loading} size="lg" className="w-full">
                {t('resetPassword')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}