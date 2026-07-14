interface Props {
  name: string
  className?: string
}

const iconMap: Record<string, string> = {
  'Free Wi-Fi':        '📶',
  'Air conditioning':  '❄️',
  'King bed':          '🛏️',
  'Queen bed':         '🛏️',
  'Rain shower':       '🚿',
  'Mini bar':          '🍷',
  'Smart TV':          '📺',
  'River terrace':     '🌊',
  'Clawfoot bath':     '🛁',
  'Private plunge pool':'💧',
  'Outdoor shower':    '🚿',
  'Kitchenette':       '🍳',
  'Fireplace':         '🔥',
  'Pool access':       '🏊',
  'Garden balcony':    '🌿',
  'Full kitchen':      '🍳',
  'Washing machine':   '🫧',
  'Firepit':           '🔥',
  '2 Bedrooms':        '🛏️',
  'Private lounge':    '🛋️',
}

export function AmenityIcon({ name, className = '' }: Props) {
  const icon = iconMap[name] ?? '✓'
  return (
    <div className={`flex items-center gap-2 text-sm text-earth ${className}`}>
      <span className="text-base w-6 text-center">{icon}</span>
      <span>{name}</span>
    </div>
  )
}