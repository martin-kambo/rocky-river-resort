'use client'
import Link              from 'next/link'
import Image             from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { Button }        from '../ui/button'
import { Badge }         from '../ui/badge'
import { formatKes }     from '../../lib/utils'
import type { RoomType } from '@rrr/types'

interface Props {
  room:     RoomType
  featured?: boolean
}

export function RoomCard({ room, featured = false }: Props) {
  const t      = useTranslations('rooms')
  const locale = useLocale()
  const hero   = room.images.find((i) => i.isHero) ?? room.images[0]

  return (
    <article className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow
      ${featured ? 'lg:flex' : ''}`}>
      {/* Image */}
      <div className={`relative bg-cream-dark ${featured ? 'lg:w-1/2 h-72 lg:h-auto' : 'h-56'}`}>
        {hero ? (
          <Image
            src={hero.url}
            alt={hero.altEn}
            fill
            className="object-cover"
            sizes={featured ? '(max-width:1024px) 100vw, 50vw' : '(max-width:768px) 100vw, 33vw'}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-forest/20 to-forest/40
                          flex items-center justify-center">
            <span className="text-forest/40 text-sm">No image</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge variant="gold">{t('from')} {formatKes(Number(room.basePriceKes))}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 ${featured ? 'lg:w-1/2 lg:flex lg:flex-col lg:justify-center' : ''}`}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-serif text-xl text-forest">{room.nameEn}</h3>
          <span className="text-xs text-sand ml-2 shrink-0">
            {t('maxOccupancy', { count: room.maxOccupancy })}
          </span>
        </div>

        <p className="text-sm text-sand leading-relaxed mb-4 line-clamp-3">
          {room.descriptionEn}
        </p>

        {/* Amenities preview */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {room.amenities.slice(0, 4).map((a) => (
            <span key={a} className="text-xs bg-cream text-sand px-2 py-0.5 rounded">
              {a}
            </span>
          ))}
          {room.amenities.length > 4 && (
            <span className="text-xs text-sand px-2 py-0.5">
              +{room.amenities.length - 4} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-sand">{t('from')}</p>
            <p className="text-lg font-medium text-forest">
              {formatKes(Number(room.basePriceKes))}
              <span className="text-xs font-normal text-sand ml-1">{t('perNight')}</span>
            </p>
          </div>
          <Button asChild size="md" variant="primary">
            <Link href={`/${locale}/accommodations/${room.slug}`}>{t('viewDetails')}</Link>
          </Button>
        </div>
      </div>
    </article>
  )
}