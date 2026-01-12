import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import {
  getMyReservations,
  getAllReservations,
  getReservation,
  createReservation,
  cancelReservation,
} from '@/services/reservations'
import type { CreateReservationParams } from '@/services/types'

const QUERY_KEYS = {
  myReservations: ['my-reservations'] as const,
  allReservations: ['all-reservations'] as const,
  reservation: (id: string) => ['reservation', id] as const,
}

/**
 * Hook to fetch current user's reservations
 */
export function useMyReservations() {
  const { isAuthenticated } = useAuth()

  return useQuery({
    queryKey: QUERY_KEYS.myReservations,
    queryFn: () => getMyReservations(),
    enabled: isAuthenticated,
  })
}

/**
 * Hook to fetch all reservations (staff only)
 */
export function useAllReservations() {
  const { isAuthenticated } = useAuth()

  return useQuery({
    queryKey: QUERY_KEYS.allReservations,
    queryFn: () => getAllReservations(),
    enabled: isAuthenticated,
  })
}

/**
 * Hook to fetch a single reservation
 */
export function useReservation(id: string) {
  const { isAuthenticated } = useAuth()

  return useQuery({
    queryKey: QUERY_KEYS.reservation(id),
    queryFn: () => getReservation(id),
    enabled: isAuthenticated && !!id,
  })
}

/**
 * Hook to create a new reservation
 */
export function useCreateReservation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: CreateReservationParams) => createReservation(params),
    onSuccess: () => {
      // Invalidate reservations list to refetch
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myReservations })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.allReservations })
    },
  })
}

/**
 * Hook to cancel a reservation
 */
export function useCancelReservation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => cancelReservation(id),
    onSuccess: (_, id) => {
      // Invalidate both lists and the specific reservation
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myReservations })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.allReservations })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.reservation(id) })
    },
  })
}
