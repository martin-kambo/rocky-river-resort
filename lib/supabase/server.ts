/**
 * lib/supabase/server.ts
 * ─────────────────────────────────────────────────────────
 * Server-side Supabase client for Rocky River Resort.
 *
 * USE THIS IN:
 *   ✅ Server Components     (app/page.tsx, app/rooms/page.tsx, etc.)
 *   ✅ API Route Handlers    (app/api/contact/route.ts, etc.)
 *   ✅ Server Actions        (form actions in admin panel)
 *   ✅ middleware.ts
 *
 * DO NOT USE IN:
 *   ❌ Client Components     (use lib/supabase/client.ts instead)
 *
 * WHY IT USES COOKIES:
 *   Supabase Auth stores the session as a cookie.
 *   This client reads that cookie so it knows who is logged in,
 *   which means RLS policies work correctly server-side.
 *
 * USAGE EXAMPLE:
 *   import { createClient } from '@/lib/supabase/server'
 *
 *   // In a Server Component:
 *   const supabase = await createClient()
 *   const { data: rooms } = await supabase
 *     .from('rooms')
 *     .select('*')
 *     .eq('is_available', true)
 * ─────────────────────────────────────────────────────────
 */

import { createServerClient } from '@supabase/ssr'
import { cookies }            from 'next/headers'
import type { Database }      from './types'

export async function createClient() {
  // cookies() gives us access to the HTTP request cookies.
  // This is how the server knows which user is authenticated.
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Read all cookies from the incoming request
        getAll() {
          return cookieStore.getAll()
        },
        // Write cookies back to the response (refreshes the session)
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // setAll can throw in Server Components where cookies are read-only.
            // This is fine — the middleware will refresh the session separately.
          }
        },
      },
    }
  )
}