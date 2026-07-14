'use client'
import { useQuery } from '@tanstack/react-query'
import { apiClient }  from '../lib/api-client'
import type { RoomType } from '@rrr/types'

async function fetchRooms(): Promise<RoomType[]> {
  const res = await apiClient.get<{ data: RoomType[] }>('/rooms')
  return res.data.data
}

async function fetchRoom(slug: string): Promise<RoomType> {
  const res = await apiClient.get<{ data: RoomType }>(`/rooms/${slug}`)
  return res.data.data
}

export function useRooms() {
  return useQuery({ queryKey: ['rooms'], queryFn: fetchRooms, staleTime: 5 * 60 * 1000 })
}

export function useRoom(slug: string) {
  return useQuery({
    queryKey: ['rooms', slug],
    queryFn:  () => fetchRoom(slug),
    enabled:  !!slug,
    staleTime: 5 * 60 * 1000,
  })
}