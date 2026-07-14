import { create } from 'zustand'

interface BookingSearch {
  roomTypeSlug: string | null
  checkIn:      string | null
  checkOut:     string | null
  adults:       number
  children:     number
}

interface BookingState {
  search: BookingSearch
  setSearch: (s: Partial<BookingSearch>) => void
  clearSearch: () => void
}

const defaultSearch: BookingSearch = {
  roomTypeSlug: null,
  checkIn:      null,
  checkOut:     null,
  adults:       2,
  children:     0,
}

export const useBookingStore = create<BookingState>()((set) => ({
  search: defaultSearch,

  setSearch: (s) =>
    set((state) => ({ search: { ...state.search, ...s } })),

  clearSearch: () => set({ search: defaultSearch }),
}))