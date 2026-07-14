import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://rockyriverresort.co.ke'
  return {
    rules:   [{ userAgent: '*', allow: '/', disallow: ['/admin', '/my-bookings', '/profile'] }],
    sitemap: `${base}/sitemap.xml`,
  }
}