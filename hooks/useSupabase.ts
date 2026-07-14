'use client'

/**
 * hooks/useSupabase.ts
 * Returns the current Supabase auth session and user.
 * Listens for auth state changes (login, logout, token refresh).
 *
 * Usage:
 *   const { user, session, loading } = useSupabase()
 *
 *   if (loading) return <Spinner />
 *   if (!user)   return <p>Not logged in</p>
 */

import { useState, useEffect } from 'react'
import type { Session, User }  from '@supabase/supabase-js'
import { createClient }        from '@/lib/supabase/client'

interface SupabaseAuthState {
  user:    User    | null
  session: Session | null
  loading: boolean
}

export function useSupabase(): SupabaseAuthState {
  const [state, setState] = useState<SupabaseAuthState>({
    user:    null,
    session: null,
    loading: true,   // true until we confirm auth state
  })

  useEffect(() => {
    const supabase = createClient()

    // Get the current session immediately on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState({
        user:    session?.user ?? null,
        session,
        loading: false,
      })
    })

    // Subscribe to auth changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setState({
          user:    session?.user ?? null,
          session,
          loading: false,
        })
      }
    )

    // Clean up subscription when component unmounts
    return () => subscription.unsubscribe()
  }, [])

  return state
}