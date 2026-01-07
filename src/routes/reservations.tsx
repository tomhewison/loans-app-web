import { createFileRoute } from '@tanstack/react-router'
import { Loader2, Calendar, Clock, Package, AlertCircle, X, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { useMyReservations, useCancelReservation } from '@/hooks/useReservations'
import type { Reservation } from '@/services/types'
import { ReservationStatus } from '@/services/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/reservations')({
  component: Reservations,
})

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = date.getTime() - now.getTime()
  const diffHours = Math.round(diffMs / (1000 * 60 * 60))
  
  if (diffHours < 0) {
    const pastHours = Math.abs(diffHours)
    if (pastHours < 24) return `${pastHours} hours ago`
    const days = Math.round(pastHours / 24)
    return `${days} day${days > 1 ? 's' : ''} ago`
  }
  
  if (diffHours < 24) return `in ${diffHours} hours`
  const days = Math.round(diffHours / 24)
  return `in ${days} day${days > 1 ? 's' : ''}`
}

function getStatusStyles(status: ReservationStatus): string {
  switch (status) {
    case ReservationStatus.Reserved:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case ReservationStatus.Collected:
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case ReservationStatus.Returned:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    case ReservationStatus.Cancelled:
    case ReservationStatus.Expired:
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

function getStatusIcon(status: ReservationStatus) {
  switch (status) {
    case ReservationStatus.Reserved:
      return <Clock className="h-4 w-4" />
    case ReservationStatus.Collected:
      return <Package className="h-4 w-4" />
    case ReservationStatus.Returned:
      return <CheckCircle2 className="h-4 w-4" />
    case ReservationStatus.Cancelled:
    case ReservationStatus.Expired:
      return <X className="h-4 w-4" />
    default:
      return null
  }
}

function ReservationCard({ reservation }: { reservation: Reservation }) {
  const cancelMutation = useCancelReservation()
  const [showConfirm, setShowConfirm] = useState(false)
  const canCancel = reservation.status === ReservationStatus.Reserved

  const expiresAt = new Date(reservation.expiresAt)
  const now = new Date()
  const isExpiringSoon = reservation.status === ReservationStatus.Reserved && 
    expiresAt > now && 
    expiresAt.getTime() - now.getTime() < 2 * 60 * 60 * 1000 // Less than 2 hours

  const returnDueAt = reservation.returnDueAt ? new Date(reservation.returnDueAt) : null
  const isOverdue = reservation.status === ReservationStatus.Collected && 
    returnDueAt && returnDueAt < now

  const handleCancel = () => {
    cancelMutation.mutate(reservation.id, {
      onSuccess: () => setShowConfirm(false),
    })
  }

  return (
    <Card className={isOverdue ? 'border-red-500' : isExpiringSoon ? 'border-yellow-500' : ''}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">Reservation #{reservation.id.slice(0, 8)}</CardTitle>
            <CardDescription>
              Created {formatDate(reservation.reservedAt)}
            </CardDescription>
          </div>
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(reservation.status)}`}>
            {getStatusIcon(reservation.status)}
            {reservation.status}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Package className="h-4 w-4" />
            <span>Device Model: {reservation.deviceModelId}</span>
          </div>
          
          {reservation.status === ReservationStatus.Reserved && (
            <div className={`flex items-center gap-2 ${isExpiringSoon ? 'text-yellow-600 font-medium' : 'text-muted-foreground'}`}>
              <Clock className="h-4 w-4" />
              <span>
                Expires {formatRelativeTime(reservation.expiresAt)}
                {isExpiringSoon && ' ⚠️'}
              </span>
            </div>
          )}

          {reservation.status === ReservationStatus.Collected && returnDueAt && (
            <div className={`flex items-center gap-2 ${isOverdue ? 'text-red-600 font-medium' : 'text-muted-foreground'}`}>
              <Calendar className="h-4 w-4" />
              <span>
                Return due {formatDate(reservation.returnDueAt!)}
                {isOverdue && ' - OVERDUE'}
              </span>
            </div>
          )}

          {reservation.collectedAt && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="h-4 w-4" />
              <span>Collected {formatDate(reservation.collectedAt)}</span>
            </div>
          )}

          {reservation.returnedAt && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="h-4 w-4" />
              <span>Returned {formatDate(reservation.returnedAt)}</span>
            </div>
          )}

          {reservation.notes && (
            <p className="text-muted-foreground italic">"{reservation.notes}"</p>
          )}
        </div>

        {canCancel && !showConfirm && (
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => setShowConfirm(true)}
            disabled={cancelMutation.isPending}
          >
            Cancel Reservation
          </Button>
        )}

        {canCancel && showConfirm && (
          <div className="flex flex-col gap-2 p-3 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
            <p className="text-sm font-medium text-red-800 dark:text-red-200">
              Cancel this reservation?
            </p>
            <p className="text-xs text-red-600 dark:text-red-400">
              The device will become available for others to reserve.
            </p>
            <div className="flex gap-2 mt-1">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowConfirm(false)}
                disabled={cancelMutation.isPending}
              >
                Keep it
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleCancel}
                disabled={cancelMutation.isPending}
              >
                {cancelMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cancelling...
                  </>
                ) : (
                  'Yes, cancel'
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ReservationsContent() {
  const { data: reservations, isLoading, error } = useMyReservations()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="font-semibold text-lg">Failed to load reservations</h3>
        <p className="text-muted-foreground">{error.message}</p>
      </div>
    )
  }

  if (!reservations || reservations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Package className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="font-semibold text-lg">No reservations yet</h3>
        <p className="text-muted-foreground">
          Browse the catalogue and reserve a device to get started.
        </p>
      </div>
    )
  }

  // Group by status
  const active = reservations.filter(r => 
    r.status === ReservationStatus.Reserved || r.status === ReservationStatus.Collected
  )
  const past = reservations.filter(r => 
    r.status === ReservationStatus.Returned || 
    r.status === ReservationStatus.Cancelled || 
    r.status === ReservationStatus.Expired
  )

  return (
    <div className="space-y-8">
      {active.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Active Reservations</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {active.map(reservation => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4 text-muted-foreground">Past Reservations</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {past.map(reservation => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function Reservations() {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Reservations</h1>
          <p className="text-muted-foreground">View and manage your device reservations.</p>
        </div>
        <ReservationsContent />
      </div>
    </ProtectedRoute>
  )
}
