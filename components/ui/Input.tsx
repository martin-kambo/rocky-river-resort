/**
 * components/ui/Input.tsx
 * Form fields — Input, Textarea, Select — all styled to match the design.
 * Each shows a validation error message when 'error' prop is passed.
 */

import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const fieldBase = [
  'w-full bg-cream border font-sans text-[0.88rem] font-light',
  'text-burgundy-deep placeholder:text-burgundy-deep/25',
  'px-[0.9rem] py-[0.65rem] outline-none',
  'transition-colors duration-250',
  'border-burgundy/15 focus:border-burgundy/45',
].join(' ')

// ── Input ──────────────────────────────────────────────────

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?:  string
  error?:  string
  hint?:   string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, hint, className, id, ...props }, ref) {
    const fieldId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-[0.4rem]">
        {label && <Label htmlFor={fieldId}>{label}</Label>}
        <input
          ref={ref}
          id={fieldId}
          className={cn(fieldBase, error && 'border-status-red/50', className)}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
          {...props}
        />
        {hint  && !error && <p id={`${fieldId}-hint`}  className="font-sans text-[0.68rem] text-burgundy-mid/60">{hint}</p>}
        {error &&           <p id={`${fieldId}-error`} className="font-sans text-[0.68rem] text-status-red">{error}</p>}
      </div>
    )
  }
)

// ── Textarea ───────────────────────────────────────────────

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?:  string
  error?:  string
  hint?:   string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ label, error, hint, className, id, ...props }, ref) {
    const fieldId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-[0.4rem]">
        {label && <Label htmlFor={fieldId}>{label}</Label>}
        <textarea
          ref={ref}
          id={fieldId}
          className={cn(fieldBase, 'resize-vertical min-h-[80px]', error && 'border-status-red/50', className)}
          aria-invalid={!!error}
          {...props}
        />
        {hint  && !error && <p className="font-sans text-[0.68rem] text-burgundy-mid/60">{hint}</p>}
        {error &&           <p className="font-sans text-[0.68rem] text-status-red">{error}</p>}
      </div>
    )
  }
)

// ── Select ─────────────────────────────────────────────────

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?:    string
  error?:    string
  options:   { value: string; label: string }[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ label, error, options, placeholder, className, id, ...props }, ref) {
    const fieldId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-[0.4rem]">
        {label && <Label htmlFor={fieldId}>{label}</Label>}
        <select
          ref={ref}
          id={fieldId}
          className={cn(fieldBase, 'cursor-pointer', error && 'border-status-red/50', className)}
          aria-invalid={!!error}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {error && <p className="font-sans text-[0.68rem] text-status-red">{error}</p>}
      </div>
    )
  }
)

// ── Label ─────────────────────────────────────────────────

interface LabelProps { htmlFor?: string; children: React.ReactNode }
function Label({ htmlFor, children }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-sans text-[0.6rem] tracking-[0.16em] uppercase text-burgundy-mid font-normal"
    >
      {children}
    </label>
  )
}