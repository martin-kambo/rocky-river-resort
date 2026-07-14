import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        primary: 'bg-gold text-earth hover:bg-gold-dark shadow-sm hover:shadow-md',
        outline: 'border border-gold text-gold hover:bg-gold hover:text-earth',
        ghost:   'text-forest hover:bg-cream-dark',
        danger:  'bg-red-600 text-white hover:bg-red-700',
        forest:  'bg-forest text-cream hover:bg-forest-dark',
      },
      size: {
        sm:  'px-3 py-1.5 text-sm',
        md:  'px-5 py-2.5 text-sm',
        lg:  'px-7 py-3.5 text-base',
        xl:  'px-9 py-4 text-lg',
        icon:'h-9 w-9',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

export function Button({ className, variant, size, loading, children, disabled, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          {children}
        </span>
      ) : children}
    </button>
  )
}
