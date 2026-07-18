'use client'
import { useState }  from 'react'
import { Input }     from '@/components/ui/input'
import { Button }    from '@/components/ui/button'
import { apiClient } from '@/lib/api-client'
import { getApiError } from '@/lib/api-client'

export default function ContactPage() {
  const [form,    setForm]    = useState({ name: '', email: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [error,   setError]   = useState('')

  const handleSubmit = async () => {
    setLoading(true); setError('')
    try {
      await apiClient.post('/contact', form)
      setSent(true)
    } catch (e) {
      setError(getApiError(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="bg-forest section-padding pt-32">
        <div className="container-narrow text-center">
          <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4">Get In Touch</p>
          <h1 className="font-serif text-5xl sm:text-6xl text-cream font-light">Contact Us</h1>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <h2 className="font-serif text-2xl text-forest mb-6">Find Us</h2>
              <div className="space-y-4 text-sand text-sm">
                <div><p className="font-medium text-earth mb-1">Address</p><p>Along Athi River, Thika East<br />Kiambu County, Kenya</p></div>
                <div><p className="font-medium text-earth mb-1">Phone</p>
                  <a href="tel:+254700000000" className="hover:text-gold transition-colors">+254 700 000 000</a></div>
                <div><p className="font-medium text-earth mb-1">Email</p>
                  <a href="mailto:hello@rockyriverresort.co.ke" className="hover:text-gold transition-colors">hello@rockyriverresort.co.ke</a></div>
                <div><p className="font-medium text-earth mb-1">Hours</p><p>Reception open 24 hours</p></div>
              </div>
            </div>

            {/* Form */}
            <div>
              {sent ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <p className="text-green-800 font-medium mb-2">Message sent!</p>
                  <p className="text-green-700 text-sm">We'll be in touch within 24 hours.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Input label="Full name" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <Input label="Email" type="email" required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  <Input label="Phone" value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-earth">Message <span className="text-red-500">*</span></label>
                    <textarea rows={5} value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded border border-cream-dark bg-white px-3 py-2.5 text-sm
                                 text-earth placeholder-sand focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <Button onClick={handleSubmit} loading={loading} size="lg" className="w-full">
                    Send Message
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}