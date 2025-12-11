import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Laptop, Tablet, Camera, Smartphone, Keyboard, Mouse, BatteryCharging, Package, Heart } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { useState } from "react"
import type { DeviceModel } from "@/services/types"
import { DeviceCategory } from "@/services/types"

const categoryIcons: Record<string, React.ReactNode> = {
  [DeviceCategory.Laptop]: <Laptop className="h-16 w-16" />,
  [DeviceCategory.Tablet]: <Tablet className="h-16 w-16" />,
  [DeviceCategory.Camera]: <Camera className="h-16 w-16" />,
  [DeviceCategory.MobilePhone]: <Smartphone className="h-16 w-16" />,
  [DeviceCategory.Keyboard]: <Keyboard className="h-16 w-16" />,
  [DeviceCategory.Mouse]: <Mouse className="h-16 w-16" />,
  [DeviceCategory.Charger]: <BatteryCharging className="h-16 w-16" />,
  [DeviceCategory.Other]: <Package className="h-16 w-16" />,
}

interface ProductCardProps {
  deviceModel: DeviceModel
}

export default function ProductCard({ deviceModel }: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  // Combine brand and model for display name
  const displayName = `${deviceModel.brand} ${deviceModel.model}`
  
  // Show icon if no image URL or if image failed to load
  const showIcon = !deviceModel.imageUrl || imageError
  
  return (
    <article className="group relative">
      <Card className="rounded-2xl border-0 bg-card p-5 shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
        <Link to="/devices/$deviceId" params={{ deviceId: deviceModel.id }} className="absolute inset-0 z-0" aria-label={`View details for ${displayName}`} />
        
        {/* Favorite icon */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsFavorited(!isFavorited)
          }}
          className="absolute right-3 top-3 z-10 rounded-full bg-card/90 p-2 shadow-sm hover:bg-card transition-colors"
          aria-label={isFavorited ? "Remove from favourites" : "Add to favourites"}
        >
          <Heart 
            className={`h-4 w-4 ${isFavorited ? "fill-destructive text-destructive" : "text-neutral-400"}`}
          />
        </button>

        {/* Image or icon placeholder */}
        <div className="relative aspect-[4/3] w-full flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl overflow-hidden mb-4">
          {showIcon ? (
            <div className="text-neutral-300 flex items-center justify-center">
              {categoryIcons[deviceModel.category] || <Package className="h-16 w-16" />}
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
            <div className="absolute left-3 top-3 rounded-full bg-warning px-3 py-1 text-[10px] text-warning-foreground font-bold shadow-md">
              TOP ITEM
            </div>
          )}
        </div>

        {/* Title and category */}
        <div className="space-y-2">
          <h3 className="font-bold text-base leading-tight text-card-foreground">{displayName}</h3>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">{deviceModel.category}</span>
          </div>
        </div>

        {/* Description preview */}
        <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
          {deviceModel.description}
        </p>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-end pt-4 border-t border-border">
          <Button 
            asChild
            size="sm" 
            variant="default"
            className="h-8 px-4 text-xs font-semibold rounded-lg z-10 relative"
            aria-label={`View ${displayName}`}
          >
            <Link to="/devices/$deviceId" params={{ deviceId: deviceModel.id }} onClick={(e) => e.stopPropagation()}>
              View Details
            </Link>
          </Button>
        </div>
      </Card>
    </article>
  )
}
