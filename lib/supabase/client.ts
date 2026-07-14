/**
 * lib/supabase/client.ts
 * ─────────────────────────────────────────────────────────
 * Browser-side Supabase client for Rocky River Resort.
 *
 * USE THIS IN:
 *   ✅ Client Components     (files with "use client" at the top)
 *   ✅ Custom hooks          (hooks/useCart.ts, hooks/useSupabase.ts)
 *   ✅ Providers             (providers/CartProvider.tsx)
 *   ✅ Image upload          (components/admin/ImageUploader.tsx)
 *
 * DO NOT USE IN:
 *   ❌ Server Components     (use lib/supabase/server.ts instead)
 *   ❌ API Routes            (use lib/supabase/server.ts instead)
 *
 * WHY A SINGLETON:
 *   Creating multiple Supabase clients causes bugs with auth state
 *   and wastes memory. One instance per browser session is correct.
 *
 * USAGE EXAMPLE:
 *   import { createClient } from '@/lib/supabase/client'
 *
 *   // Inside a Client Component:
 *   const supabase = createClient()
 *   const { data: { session } } = await supabase.auth.getSession()
 * ─────────────────────────────────────────────────────────
 */

import { createBrowserClient } from '@supabase/ssr'
import type { Database }       from './types'

// Module-level singleton — created once, reused across all client components.
// TypeScript union with undefined because it only exists in the browser.
let client: ReturnType<typeof createBrowserClient<Database>> | undefined

export function createClient() {
  if (client) return client

  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return client
}