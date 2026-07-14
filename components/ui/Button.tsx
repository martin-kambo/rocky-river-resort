/**
 * components/ui/Button.tsx
 * Single Button component covering all variants used in the design.
 * Accepts an 'as' prop to render as <a> or <button>.
 */

import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'gold' | 'ghost' | 'ghost-light' | 'danger' | 'wa'
type ButtonSize    = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?:    ButtonSize
  loading?: boolean
  as?:      'button'
}

interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant
  size?:    ButtonSize
  loading?: boolean
  as:       'a'
}

type Props = ButtonProps | AnchorProps

const base = [
  'inline-flex items-center justify-center gap-2',
  'font-sans tracking-[0.2em] uppercase font-light',
  'transition-all duration-300 cursor-pointer',
  'relative overflow-hidden',
  'border-none outline-none',
  'disabled:opacity-40 disabled:cursor-not-allowed',
].join(' ')

const variants: Record<ButtonVariant, string> = {
  'primary':      'bg-burgundy text-ivory hover:bg-burgundy-mid hover:-translate-y-px',
  'gold':         'bg-gold text-dark hover:bg-gold-warm hover:-translate-y-px',
  'ghost':        'bg-transparent border border-burgundy/30 text-burgundy hover:bg-burgundy/6 hover:border-burgundy',
  'ghost-light':  'bg-transparent border border-ivory/35 text-ivory hover:bg-white/8 hover:border-ivory/70',
  'danger':       'bg-status-red-pale text-status-red border border-status-red/15 hover:bg-red-100',
  'wa':           'bg-[#25D366] text-white hover:bg-[#1EBE58] hover:-translate-y-px',
}

const sizes: Record<ButtonSize, string> = {
  sm:  'text-[0.58rem] px-[0.9rem] py-[0.42rem]',
  md:  'text-[0.68rem] px-[1.7rem] py-[0.65rem]',
  lg:  'text-[0.72rem] px-[2.2rem] py-[0.85rem]',
}

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  Props
>(function Button(
  { variant = 'primary', size = 'md', loading, className, children, ...rest },
  ref
) {
  const classes = cn(base, variants[variant], sizes[size], className)

  const content = loading
    ? <><Spinner /> <span className="opacity-60">Loading…</span></>
    : children

  if ((rest as AnchorProps).as === 'a') {
    const { as: _, ...anchorRest } = rest as AnchorProps
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={classes}
        {...anchorRest}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      disabled={loading || (rest as ButtonProps).disabled}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  )
})

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="14" height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
  )
}