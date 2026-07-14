import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { apiClient } from '../lib/api-client'
import type { User, AuthResponse } from '@rrr/types'

interface AuthState {
  user:         User | null
  accessToken:  string | null
  refreshToken: string | null
  isLoading:    boolean
  login:   (email: string, password: string) => Promise<void>
  register:(email: string, password: string, firstName: string, lastName: string) => Promise<void>
  logout:  () => Promise<void>
  setAuth: (data: AuthResponse) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user:         null,
      accessToken:  null,
      refreshToken: null,
      isLoading:    false,

      setAuth: (data: AuthResponse) => {
        set({ user: data.user, accessToken: data.accessToken, refreshToken: data.refreshToken })
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken',  data.accessToken)
          localStorage.setItem('refreshToken', data.refreshToken)
        }
      },

      clearAuth: () => {
        set({ user: null, accessToken: null, refreshToken: null })
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
        }
      },

      login: async (email, password) => {
        set({ isLoading: true })
        try {
          const res = await apiClient.post<{ data: AuthResponse }>('/auth/login', { email, password })
          get().setAuth(res.data.data)
        } finally {
          set({ isLoading: false })
        }
      },

      register: async (email, password, firstName, lastName) => {
        set({ isLoading: true })
        try {
          const res = await apiClient.post<{ data: AuthResponse }>('/auth/register', {
            email, password, firstName, lastName,
          })
          get().setAuth(res.data.data)
        } finally {
          set({ isLoading: false })
        }
      },

      logout: async () => {
        const token = get().refreshToken
        if (token) {
          await apiClient.post('/auth/logout', { refreshToken: token }).catch(() => {})
        }
        get().clearAuth()
      },
    }),
    {
      name:    'rrr-auth',
      partialize: (state) => ({
        user:         state.user,
        accessToken:  state.accessToken,
        refreshToken: state.refreshToken,
      }),
    },
  ),
)