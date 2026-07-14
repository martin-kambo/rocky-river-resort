/**
 * lib/supabase/admin.ts
 * ─────────────────────────────────────────────────────────
 * Service-role Supabase client. BYPASSES Row Level Security.
 *
 * USE THIS IN:
 *   ✅ Admin API routes only (app/api/admin/*)
 *   ✅ Server Actions that need elevated DB access
 *
 * NEVER USE IN:
 *   ❌ Any client component         — exposes the service key
 *   ❌ Any file that runs in browser — same reason
 *   ❌ Public API routes            — anyone could trigger it
 *
 * REAL-WORLD EXAMPLES of when you need this:
 *   - Admin deletes a room → needs to bypass the RLS check
 *   - Uploading OG image → storage policy needs write access
 *   - Seeding initial data from a script
 *
 * The service role key is NEVER sent to the browser.
 * It lives only in .env.local and Vercel environment variables.
 * ─────────────────────────────────────────────────────────
 */

import { createClient }  from '@supabase/supabase-js'
import type { Database } from './types'

// This is NOT a singleton — each server request gets its own instance.
// Service-role clients should not persist session state.
export function createAdminClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY is not set. ' +
      'Add it to .env.local and Vercel environment variables.'
    )
  }

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        // Do not cache the session — each request is independent
        autoRefreshToken: false,
        persistSession:   false,
      },
    }
  )
}