import { createFileRoute } from '@tanstack/react-router'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { useReservations, useCancelReservation } from '@/hooks/useReservations'
import { ReservationStatus } from '@/services/types'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Loader2, 
  Calendar, 
  Clock, 
  Package, 
  CheckCircle2, 
  XCircle, 
  Ban,
  AlertCircle
} from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/reservations')({
  component: Reservations,
})

function Reservations() {
  return (
    <ProtectedRoute>
      <ReservationsContent />
    </ProtectedRoute>
  )
}

function ReservationsContent() {
  const { data: reservations, isLoading, error } = useReservations()
  const cancelReservation = useCancelReservation()
  const [cancellingId, setCancellingId] = useState<string | null>(null)

  const handleCancel = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this reservation?')) {
      return
    }
    
    setCancellingId(id)
    try {
      await cancelReservation.mutateAsync(id)
    } catch (error) {
      console.error('Failed to cancel reservation:', error)
      alert('Failed to cancel reservation. Please try again.')
    } finally {
      setCancellingId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Reservations</h1>
          <p className="text-muted-foreground">View and manage your device reservations.</p>
        </div>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Reservations</h1>
          <p className="text-muted-foreground">View and manage your device reservations.</p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-destructive mb-4" />
              <p className="text-destructive font-medium text-lg">Failed to load reservations</p>
              <p className="text-sm text-muted-foreground mt-1">
                {error instanceof Error ? error.message : 'An error occurred while loading your reservations.'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const sortedReservations = [...(reservations || [])].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Reservations</h1>
        <p className="text-muted-foreground">View and manage your device reservations.</p>
      </div>

      {!reservations || reservations.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="font-medium text-lg">No reservations yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                You haven't made any device reservations. Browse the catalogue to get started.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {sortedReservations.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              onCancel={handleCancel}
              isCancelling={cancellingId === reservation.id}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface ReservationCardProps {
  reservation: {
    id: string
    deviceId: string
    userId: string
    startDate: string
    endDate: string
    status: ReservationStatus
    createdAt: string
  }
  onCancel: (id: string) => void
  isCancelling: boolean
}

function ReservationCard({ reservation, onCancel, isCancelling }: ReservationCardProps) {
  const statusConfig = {
    [ReservationStatus.Reserved]: {
      label: 'Reserved',
      icon: Clock,
      className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    },
    [ReservationStatus.Collected]: {
      label: 'Collected',
      icon: Package,
      className: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    },
    [ReservationStatus.Returned]: {
      label: 'Returned',
      icon: CheckCircle2,
      className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    },
    [ReservationStatus.Cancelled]: {
      label: 'Cancelled',
      icon: XCircle,
      className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
    },
  }

  const status = statusConfig[reservation.status]
  const StatusIcon = status.icon

  const startDate = new Date(reservation.startDate)
  const endDate = new Date(reservation.endDate)
  const createdAt = new Date(reservation.createdAt)

  const canCancel = reservation.status === ReservationStatus.Reserved

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Reservation #{reservation.id.slice(0, 8)}
            </CardTitle>
            <CardDescription>Device ID: {reservation.deviceId}</CardDescription>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${status.className}`}>
            <StatusIcon className="h-4 w-4" />
            <span>{status.label}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">Start Date</p>
              <p className="text-sm text-muted-foreground">
                {startDate.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-xs text-muted-foreground">
                {startDate.toLocaleTimeString('en-US', { 
                  hour: 'numeric', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">End Date</p>
              <p className="text-sm text-muted-foreground">
                {endDate.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-xs text-muted-foreground">
                {endDate.toLocaleTimeString('en-US', { 
                  hour: 'numeric', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3 pt-2 border-t">
          <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium">Created</p>
            <p className="text-sm text-muted-foreground">
              {createdAt.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })} at {createdAt.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        </div>
      </CardContent>
      {canCancel && (
        <CardFooter>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onCancel(reservation.id)}
            disabled={isCancelling}
            className="w-full sm:w-auto"
          >
            {isCancelling ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Cancelling...
              </>
            ) : (
              <>
                <Ban className="h-4 w-4 mr-2" />
                Cancel Reservation
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
