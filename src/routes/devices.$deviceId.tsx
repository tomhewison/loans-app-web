import { createFileRoute, Link } from '@tanstack/react-router'
import { useDeviceModel } from '@/hooks/useCatalogue'
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
  Info
} from 'lucide-react'
import { useState } from 'react'

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
  const [imageError, setImageError] = useState(false)

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
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to catalogue
        </Link>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-destructive font-medium text-lg">Device not found</p>
          <p className="text-sm text-muted-foreground mt-1">
            {error?.message || "The device you're looking for doesn't exist."}
          </p>
          <Button asChild className="mt-4">
            <Link to="/">Browse Catalogue</Link>
          </Button>
        </div>
      </div>
    )
  }

  const displayName = `${deviceModel.brand} ${deviceModel.model}`
  const showIcon = !deviceModel.imageUrl || imageError
  const specs = Object.entries(deviceModel.specifications || {})

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
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
            <Button size="lg" className="flex-1">
              Request to Borrow
            </Button>
            <Button size="lg" variant="outline">
              Add to Favourites
            </Button>
          </div>

          {/* Info notice */}
          <p className="text-xs text-muted-foreground text-center">
            Borrowing is subject to availability and approval by Campus IT.
          </p>
        </div>
      </div>
    </div>
  )
}
