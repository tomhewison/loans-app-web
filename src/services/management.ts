import { apiFetch } from './api'
import type { DashboardStats, ReservationSummary, ReservationFilters } from './types'

/**
 * Get dashboard statistics (staff only)
 */
export async function getDashboardStats(): Promise<DashboardStats> {
    return apiFetch<DashboardStats>('/proxy/admin/dashboard/stats')
}

/**
 * List all reservations with optional filtering (staff only)
 */
export async function listAllReservations(
    filters?: ReservationFilters
): Promise<ReservationSummary[]> {
    const params = new URLSearchParams()

    if (filters?.status) {
        params.append('status', filters.status)
    }
    if (filters?.userId) {
        params.append('userId', filters.userId)
    }
    if (filters?.deviceModelId) {
        params.append('deviceModelId', filters.deviceModelId)
    }

    const query = params.toString()
    const endpoint = query ? `/proxy/admin/reservations?${query}` : '/proxy/admin/reservations'

    return apiFetch<ReservationSummary[]>(endpoint)
}

/**
 * List overdue reservations (staff only)
 */
export async function listOverdueReservations(): Promise<ReservationSummary[]> {
    return apiFetch<ReservationSummary[]>('/proxy/admin/reservations/overdue')
}

/**
 * List pending collections (staff only)
 */
export async function listPendingCollections(): Promise<ReservationSummary[]> {
    return apiFetch<ReservationSummary[]>('/proxy/admin/reservations/pending')
}
