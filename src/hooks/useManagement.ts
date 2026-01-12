import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import * as managementService from '../services/management'
import type { DashboardStats, ReservationSummary, ReservationFilters } from '../services/types'

/**
 * Hook to fetch dashboard statistics (staff only)
 * Auto-refetches every 30 seconds
 */
export function useDashboardStats(): UseQueryResult<DashboardStats, Error> {
    return useQuery({
        queryKey: ['dashboard', 'stats'],
        queryFn: managementService.getDashboardStats,
        refetchInterval: 30000, // Refetch every 30 seconds
        staleTime: 15000, // Consider data stale after 15 seconds
    })
}

/**
 * Hook to fetch all reservations with optional filtering (staff only)
 */
export function useAdminReservations(
    filters?: ReservationFilters
): UseQueryResult<ReservationSummary[], Error> {
    return useQuery({
        queryKey: ['admin', 'reservations', filters],
        queryFn: () => managementService.listAllReservations(filters),
        staleTime: 10000, // Consider data stale after 10 seconds
    })
}

/**
 * Hook to fetch overdue reservations (staff only)
 * Auto-refetches every 60 seconds
 */
export function useOverdueReservations(): UseQueryResult<ReservationSummary[], Error> {
    return useQuery({
        queryKey: ['admin', 'reservations', 'overdue'],
        queryFn: managementService.listOverdueReservations,
        refetchInterval: 60000, // Refetch every 60 seconds
        staleTime: 30000, // Consider data stale after 30 seconds
    })
}

/**
 * Hook to fetch pending collections (staff only)
 * Auto-refetches every 60 seconds
 */
export function usePendingCollections(): UseQueryResult<ReservationSummary[], Error> {
    return useQuery({
        queryKey: ['admin', 'reservations', 'pending'],
        queryFn: managementService.listPendingCollections,
        refetchInterval: 60000, // Refetch every 60 seconds
        staleTime: 30000, // Consider data stale after 30 seconds
    })
}
