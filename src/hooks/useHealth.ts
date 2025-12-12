import { useQuery } from '@tanstack/react-query'
import * as healthService from '@/services/health'
import type { ServiceName } from '@/services/types'

// Query keys for cache management
export const healthKeys = {
  all: ['health'] as const,
  services: () => [...healthKeys.all, 'services'] as const,
  service: (name: ServiceName) => [...healthKeys.all, 'service', name] as const,
  allServices: () => [...healthKeys.all, 'all'] as const,
}

/**
 * Hook to check health status of a specific service
 */
export function useServiceHealth(serviceName: ServiceName) {
  return useQuery({
    queryKey: healthKeys.service(serviceName),
    queryFn: () => healthService.checkServiceHealth(serviceName),
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 1,
  })
}

/**
 * Hook to check health status of all services
 */
export function useAllServicesHealth() {
  return useQuery({
    queryKey: healthKeys.allServices(),
    queryFn: () => healthService.checkAllServicesHealth(),
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 1,
  })
}
