import { apiFetch } from './api'
import type { HealthStatus, ServiceName } from './types'

const SERVICE_PATHS: Record<ServiceName, string> = {
  catalogue: '/proxy/catalogue',
  availability: '/proxy/availability',
  reservations: '/proxy/reservations',
  management: '/proxy/management',
  notifications: '/proxy/notifications',
}

/**
 * Check health status of a specific service using apiFetch
 */
export async function checkServiceHealth(serviceName: ServiceName): Promise<HealthStatus> {
  const basePath = SERVICE_PATHS[serviceName]
  const endpoint = `${basePath}/health`
  try {
    return await apiFetch<HealthStatus>(endpoint)
  } catch (error: any) {
    // If the request fails, return an unhealthy status
    const message =
      error instanceof Error
        ? error.message
        : typeof error === 'string'
          ? error
          : 'Service unavailable'
    return {
      status: 'unhealthy',
      service: serviceName,
      timestamp: new Date().toISOString(),
      error: message,
    }
  }
}

/**
 * Check health status of all services in parallel
 */
export async function checkAllServicesHealth(): Promise<Record<ServiceName, HealthStatus>> {
  const services: ServiceName[] = [
    'catalogue',
    'availability',
    'reservations',
    'management',
    'notifications',
  ]

  const results = await Promise.allSettled(
    services.map(async (service) => {
      const health = await checkServiceHealth(service)
      return { service, health }
    })
  )

  const healthMap: Record<ServiceName, HealthStatus> = {} as Record<ServiceName, HealthStatus>

  results.forEach((result, index) => {
    const serviceName = services[index]
    if (result.status === 'fulfilled') {
      healthMap[serviceName] = result.value.health
    } else {
      healthMap[serviceName] = {
        status: 'unhealthy',
        service: serviceName,
        timestamp: new Date().toISOString(),
        error: result.reason?.message || 'Unknown error',
      }
    }
  })

  return healthMap
}
