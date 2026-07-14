'use client'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../lib/api-client'
import type { AvailabilityResponse } from '@rrr/types'

interface AvailabilityParams {
  roomTypeSlug: string
  checkIn:      string
  checkOut:     string
  guests:       number
}

async function fetchAvailability(params: AvailabilityParams): Promise<AvailabilityResponse> {
  const res = await apiClient.get<{ data: AvailabilityResponse }>(
    `/rooms/${params.roomTypeSlug}/availability`,
    { params: { checkIn: params.checkIn, checkOut: params.checkOut, guests: params.guests } },
  )
  return res.data.data
}

export function useAvailability(params: AvailabilityParams | null) {
  return useQuery({
    queryKey: ['availability', params],
    queryFn:  () => fetchAvailability(params!),
    enabled:  !!params?.roomTypeSlug && !!params.checkIn && !!params.checkOut,
    staleTime: 2 * 60 * 1000,
  })
}