import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/**
 * next.config.ts — platform-agnostic.
 * Deployment platform config lives in apps/web/netlify.toml
 */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp', ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff'                          },
          { key: 'X-Frame-Options',         value: 'DENY'                             },
          { key: 'Referrer-Policy',          value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      { source: '/reservations', destination: '/book',                 permanent: true },
      { source: '/rooms',        destination: '/accommodations',       permanent: true },
      { source: '/rooms/:slug',  destination: '/accommodations/:slug', permanent: true },
    ]
  },
}

export default withNextIntl(nextConfig)