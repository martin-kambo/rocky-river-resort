import { cn } from '../../lib/utils'
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:   string
  error?:   string
  hint?:    string
}

export function Input({ label, error, hint, className, id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-earth">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full rounded border bg-white px-3 py-2.5 text-sm text-earth placeholder-sand',
          'transition-colors outline-none',
          'focus:border-gold focus:ring-1 focus:ring-gold',
          error ? 'border-red-400' : 'border-cream-dark',
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-sand">{hint}</p>}
    </div>
  )
}