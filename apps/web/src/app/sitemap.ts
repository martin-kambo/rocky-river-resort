import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base  = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://rockyriverresort.co.ke'
  const now   = new Date()
  const langs = ['en', 'sw']

  const staticRoutes = [
    { path: '',               priority: 1.0,  changeFreq: 'weekly'  },
    { path: '/about',         priority: 0.8,  changeFreq: 'monthly' },
    { path: '/accommodations',priority: 0.9,  changeFreq: 'weekly'  },
    { path: '/amenities',     priority: 0.7,  changeFreq: 'monthly' },
    { path: '/experiences',   priority: 0.7,  changeFreq: 'monthly' },
    { path: '/gallery',       priority: 0.6,  changeFreq: 'monthly' },
    { path: '/contact',       priority: 0.7,  changeFreq: 'monthly' },
    { path: '/blog',          priority: 0.6,  changeFreq: 'weekly'  },
    { path: '/book',          priority: 0.95, changeFreq: 'daily'   },
  ] as const

  const entries: MetadataRoute.Sitemap = []

  for (const lang of langs) {
    for (const route of staticRoutes) {
      entries.push({
        url:              `${base}/${lang}${route.path}`,
        lastModified:     now,
        changeFrequency:  route.changeFreq as any,
        priority:         route.priority,
      })
    }
  }

  return entries
}