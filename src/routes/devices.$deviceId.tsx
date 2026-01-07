import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useDeviceModel, useDeviceModelAvailability } from '@/hooks/useCatalogue'
import { useCreateReservation } from '@/hooks/useReservations'
import { useAuth0 } from '@auth0/auth0-react'
import { DeviceCategory } from '@/services/types'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { 
  ArrowLeft, 
  Loader2, 
  Laptop, 
  Tablet, 
  Camera, 
  Smartphone, 
  Keyboard, 
  Mouse, 
  BatteryCharging, 
  Package,
  Star,
  Calendar,
  Info,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle
} from 'lucide-react'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export const Route = createFileRoute('/devices/$deviceId')({
  component: DeviceDetail,
})

const categoryIcons: Record<string, React.ReactNode> = {
  [DeviceCategory.Laptop]: <Laptop className="h-24 w-24" />,
  [DeviceCategory.Tablet]: <Tablet className="h-24 w-24" />,
  [DeviceCategory.Camera]: <Camera className="h-24 w-24" />,
  [DeviceCategory.MobilePhone]: <Smartphone className="h-24 w-24" />,
  [DeviceCategory.Keyboard]: <Keyboard className="h-24 w-24" />,
  [DeviceCategory.Mouse]: <Mouse className="h-24 w-24" />,
  [DeviceCategory.Charger]: <BatteryCharging className="h-24 w-24" />,
  [DeviceCategory.Other]: <Package className="h-24 w-24" />,
}

function AvailabilityBadge({ 
  availableCount, 
  totalDevices,
  isLoading 
}: { 
  availableCount: number
  totalDevices: number
  isLoading: boolean
}) {
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Checking availability...</span>
      </div>
    )
  }

  if (availableCount === 0) {
    return (
      <div className="flex items-center gap-2 text-red-600">
        <XCircle className="h-5 w-5" />
        <span className="font-medium">Currently unavailable</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 text-green-600">
      <CheckCircle className="h-5 w-5" />
      <span className="font-medium">
        {availableCount} of {totalDevices} available
      </span>
    </div>
  )
}

function BookingDialog({
  open,
  onOpenChange,
  deviceModelId,
  deviceModelName,
  availableDeviceId,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  deviceModelId: string
  deviceModelName: string
  availableDeviceId?: string
}) {
  const [notes, setNotes] = useState('')
  const navigate = useNavigate()
  const createReservation = useCreateReservation()

  const handleSubmit = async () => {
    if (!availableDeviceId) return

    try {
      await createReservation.mutateAsync({
        deviceId: availableDeviceId,
        deviceModelId,
        notes: notes.trim() || undefined,
      })
      onOpenChange(false)
      setNotes('')
      // Navigate to reservations page
      navigate({ to: '/reservations' })
    } catch (error) {
      // Error is handled by the mutation
      console.error('Failed to create reservation:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request to Borrow</DialogTitle>
          <DialogDescription>
            You're requesting to borrow: <strong>{deviceModelName}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-800 dark:text-blue-200">
                Reservation valid for 24 hours
              </p>
              <p className="text-blue-600 dark:text-blue-400 mt-1">
                Please collect the device from Campus IT within this time, or the reservation will expire.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any special requirements or notes for staff..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        {createReservation.isError && (
          <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <div className="text-sm text-red-800 dark:text-red-200">
              {createReservation.error?.message || 'Failed to create reservation. Please try again.'}
            </div>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={createReservation.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={createReservation.isPending || !availableDeviceId}
          >
            {createReservation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Reserving...
              </>
            ) : (
              'Confirm Reservation'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function DeviceDetail() {
  return (
    <ProtectedRoute>
      <DeviceDetailContent />
    </ProtectedRoute>
  )
}

function DeviceDetailContent() {
  const { deviceId } = Route.useParams()
  const { data: deviceModel, isLoading, error } = useDeviceModel(deviceId)
  const { data: availability, isLoading: availabilityLoading } = useDeviceModelAvailability(deviceId)
  const { isAuthenticated, loginWithRedirect } = useAuth0()
  const [imageError, setImageError] = useState(false)
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !deviceModel) {
    return (
      <div className="space-y-6">
        <Link to="/catalogue" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to catalogue
        </Link>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-destructive font-medium text-lg">Device not found</p>
          <p className="text-sm text-muted-foreground mt-1">
            {error?.message || "The device you're looking for doesn't exist."}
          </p>
          <Button asChild className="mt-4">
            <Link to="/catalogue">Browse Catalogue</Link>
          </Button>
        </div>
      </div>
    )
  }

  const displayName = `${deviceModel.brand} ${deviceModel.model}`
  const showIcon = !deviceModel.imageUrl || imageError
  const specs = Object.entries(deviceModel.specifications || {})

  const handleRequestBorrow = () => {
    if (!isAuthenticated) {
      loginWithRedirect({
        appState: { returnTo: `/devices/${deviceId}` },
      })
      return
    }
    setBookingDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link to="/catalogue" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to catalogue
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image Section */}
        <Card className="rounded-2xl border-0 bg-card p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
          <div className="relative aspect-square w-full flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl overflow-hidden">
            {showIcon ? (
              <div className="text-neutral-300 flex items-center justify-center">
                {categoryIcons[deviceModel.category] || <Package className="h-24 w-24" />}
              </div>
            ) : (
              <img 
                src={deviceModel.imageUrl} 
                alt={displayName}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            )}
            {deviceModel.featured && (
              <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-warning px-3 py-1.5 text-xs text-warning-foreground font-bold shadow-md">
                <Star className="h-3 w-3 fill-current" />
                TOP ITEM
              </div>
            )}
          </div>
        </Card>

        {/* Details Section */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <span className="text-xs text-primary font-semibold uppercase tracking-wide">
              {deviceModel.category}
            </span>
            <h1 className="text-3xl font-bold text-card-foreground mt-1">
              {displayName}
            </h1>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              {deviceModel.description}
            </p>
          </div>

          {/* Availability Status */}
          {isAuthenticated && (
            <Card className="rounded-xl border-0 bg-card p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between">
                <AvailabilityBadge
                  availableCount={availability?.availableCount ?? 0}
                  totalDevices={availability?.totalDevices ?? 0}
                  isLoading={availabilityLoading}
                />
              </div>
            </Card>
          )}

          {/* Specifications */}
          {specs.length > 0 && (
            <Card className="rounded-xl border-0 bg-card p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <h2 className="text-sm font-semibold text-card-foreground mb-4 flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                Specifications
              </h2>
              <dl className="space-y-3">
                {specs.map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <dt className="text-sm text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ')}
                    </dt>
                    <dd className="text-sm font-medium text-card-foreground">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
          )}

          {/* Last Updated */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            Last updated: {new Date(deviceModel.updatedAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              size="lg" 
              className="flex-1"
              onClick={handleRequestBorrow}
              disabled={isAuthenticated && (availabilityLoading || !availability?.canReserve)}
            >
              {!isAuthenticated ? (
                'Sign in to Borrow'
              ) : availabilityLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : availability?.canReserve ? (
                'Request to Borrow'
              ) : (
                'Currently Unavailable'
              )}
            </Button>
          </div>

          {/* Info notice */}
          <p className="text-xs text-muted-foreground text-center">
            Borrowing is subject to availability and approval by Campus IT.
          </p>
        </div>
      </div>

      {/* Booking Dialog */}
      <BookingDialog
        open={bookingDialogOpen}
        onOpenChange={setBookingDialogOpen}
        deviceModelId={deviceId}
        deviceModelName={displayName}
        availableDeviceId={availability?.availableDeviceId}
      />
    </div>
  )
}
