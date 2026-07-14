'use client'
import { useAvailability } from '../../hooks/useAvailability'
import { Badge }           from '../ui/badge'
import { formatKes }       from '../../lib/utils'

interface Props {
  roomTypeSlug: string
  checkIn:      string
  checkOut:     string
  guests:       number
}

export function AvailabilityBadge({ roomTypeSlug, checkIn, checkOut, guests }: Props) {
  const { data, isLoading } = useAvailability({ roomTypeSlug, checkIn, checkOut, guests })

  if (isLoading) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-sand">
        <span className="h-1.5 w-1.5 rounded-full bg-sand animate-pulse" />
        Checking…
      </span>
    )
  }

  if (!data) return null

  return data.available ? (
    <div className="flex items-center gap-3">
      <Badge variant="success">Available</Badge>
      <span className="text-sm font-medium text-forest">
        {formatKes(data.totalKes)} total
      </span>
      <span className="text-xs text-sand">
        ({formatKes(data.pricePerNightKes)}/night incl. VAT)
      </span>
    </div>
  ) : (
    <Badge variant="error">Unavailable for these dates</Badge>
  )
}