'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient }    from '../lib/api-client'
import type { Booking } from '@rrr/types'

async function fetchMyBookings(): Promise<Booking[]> {
  const res = await apiClient.get<{ data: Booking[] }>('/bookings')
  return res.data.data
}

async function cancelBooking(id: string): Promise<Booking> {
  const res = await apiClient.patch<{ data: Booking }>(`/bookings/${id}/cancel`)
  return res.data.data
}

export function useMyBookings() {
  return useQuery({
    queryKey: ['bookings', 'mine'],
    queryFn:  fetchMyBookings,
    staleTime: 30_000,
  })
}

export function useCancelBooking() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: cancelBooking,
    onSuccess:  () => queryClient.invalidateQueries({ queryKey: ['bookings'] }),
  })
}