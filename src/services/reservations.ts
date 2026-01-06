import { apiFetch } from './api'
import type { Reservation, CreateReservationParams } from './types'

const BASE_PATH = '/reservations'

/**
 * Get current user's reservations
 */
export async function getMyReservations(token: string): Promise<Reservation[]> {
  return apiFetch<Reservation[]>(`${BASE_PATH}/my-reservations`, { token })
}

/**
 * Get all reservations (staff only)
 */
export async function getAllReservations(token: string): Promise<Reservation[]> {
  return apiFetch<Reservation[]>(BASE_PATH, { token })
}

/**
 * Get a specific reservation by ID
 */
export async function getReservation(id: string, token: string): Promise<Reservation> {
  return apiFetch<Reservation>(`${BASE_PATH}/${id}`, { token })
}

/**
 * Create a new reservation
 */
export async function createReservation(
  params: CreateReservationParams,
  token: string
): Promise<Reservation> {
  return apiFetch<Reservation>(BASE_PATH, {
    method: 'POST',
    body: JSON.stringify(params),
    token,
  })
}

/**
 * Cancel a reservation
 */
export async function cancelReservation(id: string, token: string): Promise<Reservation> {
  return apiFetch<Reservation>(`${BASE_PATH}/${id}/cancel`, {
    method: 'PUT',
    token,
  })
}
