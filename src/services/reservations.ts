import { apiFetch } from './api'
import type { Reservation, CreateReservationParams } from './types'

const BASE_PATH = '/proxy/reservations'

/**
 * Get current user's reservations (auth via cookie)
 */
export async function getMyReservations(): Promise<Reservation[]> {
  return apiFetch<Reservation[]>(`${BASE_PATH}/my-reservations`)
}

/**
 * Get all reservations (staff only - auth via cookie)
 */
export async function getAllReservations(): Promise<Reservation[]> {
  return apiFetch<Reservation[]>(BASE_PATH)
}

/**
 * Get a specific reservation by ID (auth via cookie)
 */
export async function getReservation(id: string): Promise<Reservation> {
  return apiFetch<Reservation>(`${BASE_PATH}/${id}`)
}

/**
 * Create a new reservation (auth via cookie)
 */
export async function createReservation(
  params: CreateReservationParams
): Promise<Reservation> {
  return apiFetch<Reservation>(BASE_PATH, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

/**
 * Cancel a reservation (auth via cookie)
 */
export async function cancelReservation(id: string): Promise<Reservation> {
  return apiFetch<Reservation>(`${BASE_PATH}/${id}/cancel`, {
    method: 'PUT',
  })
}
