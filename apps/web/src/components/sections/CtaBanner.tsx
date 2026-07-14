import Link              from 'next/link'
import { getLocale }     from 'next-intl/server'
import { Button }        from '../ui/button'

export async function CtaBanner() {
  const locale = await getLocale()
  return (
    <section className="section-padding bg-gold">
      <div className="container-narrow text-center">
        <h2 className="font-serif text-4xl sm:text-5xl text-earth font-light mb-4">
          Ready to Escape?
        </h2>
        <p className="text-earth/70 text-lg mb-8 max-w-xl mx-auto">
          Reserve your stay along the Athi River. Rates from KES 18,000 per night, including VAT.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="forest" size="xl">
            <Link href={`/${locale}/book`}>Reserve Now</Link>
          </Button>
          <Button asChild variant="outline" size="xl"
            className="border-earth text-earth hover:bg-earth hover:text-cream">
            <Link href={`/${locale}/contact`}>Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}