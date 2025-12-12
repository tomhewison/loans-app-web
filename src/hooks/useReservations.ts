import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth0 } from '@/contexts/AuthContext'
import * as reservationService from '@/services/reservations'
import type { CreateReservationRequest } from '@/services/types'

// Query keys for cache management
export const reservationKeys = {
  all: ['reservations'] as const,
  lists: () => [...reservationKeys.all, 'list'] as const,
  list: () => [...reservationKeys.lists()] as const,
  details: () => [...reservationKeys.all, 'detail'] as const,
  detail: (id: string) => [...reservationKeys.details(), id] as const,
}

/**
 * Hook to fetch list of user's reservations
 */
export function useReservations() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()

  return useQuery({
    queryKey: reservationKeys.list(),
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return reservationService.listReservations(token)
    },
    enabled: isAuthenticated,
  })
}

/**
 * Hook to fetch a single reservation by ID
 */
export function useReservation(id: string) {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()

  return useQuery({
    queryKey: reservationKeys.detail(id),
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return reservationService.getReservation(id, token)
    },
    enabled: !!id && isAuthenticated,
  })
}

/**
 * Hook to create a new reservation
 */
export function useCreateReservation() {
  const queryClient = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()

  return useMutation({
    mutationFn: async (params: CreateReservationRequest) => {
      const token = await getAccessTokenSilently()
      return reservationService.createReservation(params, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reservationKeys.all })
    },
  })
}

/**
 * Hook to cancel a reservation
 */
export function useCancelReservation() {
  const queryClient = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()

  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getAccessTokenSilently()
      return reservationService.cancelReservation(id, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reservationKeys.all })
    },
  })
}
