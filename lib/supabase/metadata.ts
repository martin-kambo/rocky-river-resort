/**
 * lib/metadata.ts
 * SEO metadata builder. Each page calls buildMetadata()
 * with its own overrides. The root layout sets the defaults.
 */

import type { Metadata } from 'next'

const defaults = {
  siteName:    'Rocky River Resort',
  description:
    'A luxury riverside escape along the Athi River near Fourteen Falls ' +
    'and Kilimambogo Mountain, Thika East, Kenya. 68km from Nairobi.',
  url:         process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rockyriverresort.co.ke',
  ogImage:     '/og-image.jpg',    // 1200×630px in /public/
}

/**
 * Build a complete Metadata object for a page.
 *
 * Usage in any page:
 *   export const metadata = buildMetadata({
 *     title: 'Rooms',
 *     description: 'Browse our riverside accommodation options.',
 *   })
 */
export function buildMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    metadataBase: new URL(defaults.url),

    title: {
      default:  defaults.siteName,
      template: `%s | ${defaults.siteName}`,
    },
    description: defaults.description,

    keywords: [
      'Rocky River Resort', 'Thika resort', 'Fourteen Falls', 'Athi River',
      'Kilimambogo', 'Nairobi weekend getaway', 'Kenya riverside resort',
      'Thika East accommodation', 'luxury resort Kenya',
    ],

    openGraph: {
      type:      'website',
      locale:    'en_KE',
      siteName:  defaults.siteName,
      title:     defaults.siteName,
      description: defaults.description,
      images: [
        { url: defaults.ogImage, width: 1200, height: 630, alt: 'Rocky River Resort' },
      ],
    },

    twitter: {
      card:        'summary_large_image',
      title:       defaults.siteName,
      description: defaults.description,
      images:      [defaults.ogImage],
    },

    robots: {
      index:  true,
      follow: true,
    },

    // Allow individual pages to override anything above
    ...overrides,
  }
}