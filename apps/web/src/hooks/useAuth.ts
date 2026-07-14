'use client'
import { useAuthStore } from '../stores/auth.store'
import { useRouter }    from 'next/navigation'
import { useLocale }    from 'next-intl'

export function useAuth() {
  const { user, accessToken, isLoading, login, register, logout } = useAuthStore()
  const router = useRouter()
  const locale = useLocale()

  const isAuthenticated = !!accessToken && !!user
  const isAdmin         = user?.role === 'admin'

  const handleLogout = async () => {
    await logout()
    router.push(`/${locale}/login`)
  }

  const requireAuth = () => {
    if (!isAuthenticated) {
      router.push(`/${locale}/login`)
      return false
    }
    return true
  }

  return { user, isAuthenticated, isAdmin, isLoading, login, register, logout: handleLogout, requireAuth }
}