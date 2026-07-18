import type { Metadata } from 'next'
import { notFound }      from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { QueryProvider } from '@/components/shared/QueryProvider'
import { Analytics } from '@/components/shared/Analytics'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title:       'Rocky River Resort — Thika East, Kenya',
  description: 'Luxury nature resort along the Athi River. Elegant rooms, world-class dining, and authentic Kenyan experiences.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'https://rockyriverresort.co.ke'),
  openGraph: {
    type:   'website',
    locale: 'en_KE',
    siteName: 'Rocky River Resort',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages()

  return (
  
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1C3A2B" />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <QueryProvider>
            <Navbar />
            <main className="min-h-screen pt-16">
              {children}
            </main>
            <Footer />
            <Toaster />
            <Analytics />
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}