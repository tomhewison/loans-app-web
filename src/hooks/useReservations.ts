import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'
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

const AUTH0_AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE

/**
 * Hook to get a fresh access token
 */
function useAccessToken() {
  const { getAccessTokenSilently } = useAuth0()
  return async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: AUTH0_AUDIENCE,
        },
      })
      return token
    } catch (error) {
      console.error('Failed to get access token:', error)
      throw new Error('Unable to get access token. Please log in again.')
    }
  }
}

/**
 * Hook to fetch current user's reservations
 */
export function useMyReservations() {
  const { isAuthenticated } = useAuth0()
  const getToken = useAccessToken()

  return useQuery({
    queryKey: QUERY_KEYS.myReservations,
    queryFn: async () => {
      const token = await getToken()
      return getMyReservations(token)
    },
    enabled: isAuthenticated,
  })
}

/**
 * Hook to fetch all reservations (staff only)
 */
export function useAllReservations() {
  const { isAuthenticated } = useAuth0()
  const getToken = useAccessToken()

  return useQuery({
    queryKey: QUERY_KEYS.allReservations,
    queryFn: async () => {
      const token = await getToken()
      return getAllReservations(token)
    },
    enabled: isAuthenticated,
  })
}

/**
 * Hook to fetch a single reservation
 */
export function useReservation(id: string) {
  const { isAuthenticated } = useAuth0()
  const getToken = useAccessToken()

  return useQuery({
    queryKey: QUERY_KEYS.reservation(id),
    queryFn: async () => {
      const token = await getToken()
      return getReservation(id, token)
    },
    enabled: isAuthenticated && !!id,
  })
}

/**
 * Hook to create a new reservation
 */
export function useCreateReservation() {
  const queryClient = useQueryClient()
  const { user } = useAuth0()
  const getToken = useAccessToken()

  return useMutation({
    mutationFn: async (params: Omit<CreateReservationParams, 'userEmail'>) => {
      if (!user?.email) {
        throw new Error('User email not available. Please log in again.')
      }
      const token = await getToken()
      return createReservation({ ...params, userEmail: user.email }, token)
    },
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
  const getToken = useAccessToken()

  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken()
      return cancelReservation(id, token)
    },
    onSuccess: (_, id) => {
      // Invalidate both lists and the specific reservation
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myReservations })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.allReservations })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.reservation(id) })
    },
  })
}






