import createMiddleware from 'next-intl/middleware'
import { routing }     from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // _vercel is a Next.js standard exclusion pattern — not a Vercel platform dependency
  matcher: ['/((?!_next|_vercel|api|.*\\..*).*)'],
}