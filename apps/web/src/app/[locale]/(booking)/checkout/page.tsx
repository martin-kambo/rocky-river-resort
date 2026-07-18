'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useLocale }                  from 'next-intl'
import { useState }                   from 'react'
import { apiClient, getApiError }     from '@/lib/api-client'
import { Button }                     from '@/components/ui/button'
import { Input }                      from '@/components/ui/input'
import { formatKes }                  from '@/lib/utils'

export default function CheckoutPage() {
  const sp        = useSearchParams()
  const locale    = useLocale()
  const router    = useRouter()
  const bookingId = sp.get('bookingId') ?? ''

  const [method,  setMethod]  = useState<'mpesa' | 'stripe'>('mpesa')
  const [phone,   setPhone]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const handleMpesa = async () => {
    setLoading(true); setError('')
    try {
      await apiClient.post('/payments/mpesa/initiate', { bookingId, phone })
      router.push(`/${locale}/confirmation/${bookingId}`)
    } catch (e) {
      setError(getApiError(e))
    } finally {
      setLoading(false)
    }
  }

  const handleStripe = async () => {
    setLoading(true); setError('')
    try {
      const res = await apiClient.post('/payments/stripe/intent', { bookingId, currency: 'KES' })
      // clientSecret available — in Phase 2 wire @stripe/react-stripe-js Elements here
      console.log('Stripe intent created:', res.data.data.clientSecret)
      router.push(`/${locale}/confirmation/${bookingId}`)
    } catch (e) {
      setError(getApiError(e))
    } finally {
      setLoading(false)
    }
  }

  if (!bookingId) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-sand">No booking selected. <a href={`/${locale}/book`} className="text-gold">Start over</a></p>
      </div>
    )
  }

  return (
    <section className="min-h-screen bg-cream section-padding pt-32">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <p className="text-gold text-xs tracking-widest uppercase mb-3">Secure Payment</p>
          <h1 className="font-serif text-4xl text-forest font-light">Complete Your Booking</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Payment method tabs */}
          <div className="flex gap-3 mb-6">
            {(['mpesa', 'stripe'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={`flex-1 py-2.5 rounded border text-sm font-medium transition-colors
                  ${method === m ? 'bg-forest text-cream border-forest' : 'border-cream-dark text-sand hover:border-gold'}`}
              >
                {m === 'mpesa' ? 'M-Pesa' : 'Card (Stripe)'}
              </button>
            ))}
          </div>

          {method === 'mpesa' ? (
            <div className="space-y-4">
              <Input
                label="M-Pesa phone number"
                type="tel"
                placeholder="+254712345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <p className="text-xs text-sand">
                You'll receive an STK push on your phone to complete payment.
              </p>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button onClick={handleMpesa} loading={loading} size="lg" className="w-full">
                Pay with M-Pesa
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-cream rounded p-4 text-center text-sm text-sand">
                Card payments are processed securely via Stripe.
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button onClick={handleStripe} loading={loading} size="lg" className="w-full"
                variant="forest">
                Pay with Card
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}