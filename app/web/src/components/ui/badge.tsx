import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded px-2 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default:   'bg-forest text-cream',
        gold:      'bg-gold text-earth',
        outline:   'border border-gold text-gold',
        success:   'bg-green-100 text-green-800',
        warning:   'bg-yellow-100 text-yellow-800',
        error:     'bg-red-100 text-red-800',
        secondary: 'bg-cream text-sand',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}