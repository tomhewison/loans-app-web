import { createFileRoute } from '@tanstack/react-router'
import { useAllServicesHealth } from '@/hooks/useHealth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Activity,
  RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQueryClient } from '@tanstack/react-query'
import { healthKeys } from '@/hooks/useHealth'

export const Route = createFileRoute('/health')({
  component: HealthStatus,
})

const SERVICE_DISPLAY_NAMES: Record<string, string> = {
  catalogue: 'Catalogue Service',
  availability: 'Availability Service',
  reservations: 'Reservation Service',
  management: 'Management Service',
  notifications: 'Notification Service',
}

function HealthStatus() {
  const { data: servicesHealth, isLoading, error, refetch, isRefetching } = useAllServicesHealth()
  const queryClient = useQueryClient()

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: healthKeys.all })
    refetch()
  }

  if (isLoading && !servicesHealth) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Service Health Status</h1>
          <p className="text-muted-foreground">Monitor the status of all backend services.</p>
        </div>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  const services = servicesHealth ? Object.entries(servicesHealth) : []
  const healthyCount = services.filter(([_, health]) => health.status === 'healthy').length
  const totalCount = services.length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Service Health Status</h1>
          <p className="text-muted-foreground">Monitor the status of all backend services.</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefetching}
        >
          {isRefetching ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Refreshing...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </>
          )}
        </Button>
      </div>

      {/* Overall Status Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Overall Status
          </CardTitle>
          <CardDescription>
            {healthyCount} of {totalCount} services are healthy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            {healthyCount === totalCount ? (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-6 w-6" />
                <span className="font-semibold">All Systems Operational</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <AlertCircle className="h-6 w-6" />
                <span className="font-semibold">
                  {totalCount - healthyCount} Service{totalCount - healthyCount !== 1 ? 's' : ''} Unavailable
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Error State */}
      {error && !servicesHealth && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-destructive mb-4" />
              <p className="text-destructive font-medium text-lg">Failed to load health status</p>
              <p className="text-sm text-muted-foreground mt-1">
                {error instanceof Error ? error.message : 'An error occurred while checking service health.'}
              </p>
              <Button onClick={handleRefresh} className="mt-4" variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Service Status Cards */}
      {services.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map(([serviceName, health]) => (
            <ServiceHealthCard
              key={serviceName}
              serviceName={serviceName}
              health={health}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface ServiceHealthCardProps {
  serviceName: string
  health: {
    status: 'healthy' | 'unhealthy'
    service: string
    timestamp: string
    error?: string
  }
}

function ServiceHealthCard({ serviceName, health }: ServiceHealthCardProps) {
  const displayName = SERVICE_DISPLAY_NAMES[serviceName] || serviceName
  const isHealthy = health.status === 'healthy'
  const timestamp = new Date(health.timestamp)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{displayName}</CardTitle>
          {isHealthy ? (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>Healthy</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
              <XCircle className="h-4 w-4" />
              <span>Unhealthy</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm text-muted-foreground">
          <p>
            Last checked: {timestamp.toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </p>
        </div>
        {health.error && (
          <div className="pt-2 border-t">
            <p className="text-xs font-medium text-destructive mb-1">Error:</p>
            <p className="text-xs text-muted-foreground break-words">{health.error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
