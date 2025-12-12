import { apiFetch } from './api'
import type { Reservation, CreateReservationRequest } from './types'

const BASE_PATH = '/reservations'

/**
 * List user's reservations (students see own, staff see all)
 */
export async function listReservations(token: string): Promise<Reservation[]> {
  return apiFetch<Reservation[]>(BASE_PATH, { token })
}

/**
 * Get a single reservation by ID
 */
export async function getReservation(id: string, token: string): Promise<Reservation> {
  return apiFetch<Reservation>(`${BASE_PATH}/${id}`, { token })
}

/**
 * Create a new reservation
 */
export async function createReservation(
  params: CreateReservationRequest,
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
export async function cancelReservation(
  id: string,
  token: string
): Promise<Reservation> {
  return apiFetch<Reservation>(`${BASE_PATH}/${id}/cancel`, {
    method: 'PUT',
    token,
  })
}
