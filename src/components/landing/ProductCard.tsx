import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Laptop, Tablet, Camera, Circle, Heart } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { useState } from "react"

type Device = {
  id: string
  name: string
  type: string
  status: string
  featured?: boolean
}

const typeIcons: Record<string, React.ReactNode> = {
  Laptop: <Laptop className="h-16 w-16" />,
  Tablet: <Tablet className="h-16 w-16" />,
  Camera: <Camera className="h-16 w-16" />,
}

export default function ProductCard({ device }: { device: Device }) {
  const isAvailable = device.status === "Available"
  const [isFavorited, setIsFavorited] = useState(false)
  
  return (
    <article className="group relative">
      <Card className="rounded-2xl border-0 bg-card p-5 shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
        <Link to="/devices/$deviceId" params={{ deviceId: device.id }} className="absolute inset-0 z-0" aria-label={`View details for ${device.name}`} />
        {/* Favorite icon */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsFavorited(!isFavorited)
          }}
          className="absolute right-3 top-3 z-10 rounded-full bg-card/90 p-2 shadow-sm hover:bg-card transition-colors"
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            className={`h-4 w-4 ${isFavorited ? "fill-destructive text-destructive" : "text-neutral-400"}`}
          />
        </button>

        {/* Image placeholder with icon */}
        <div className="relative aspect-[4/3] w-full flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl overflow-hidden mb-4">
          <div className="text-neutral-300 flex items-center justify-center">
            {typeIcons[device.type] || <Laptop className="h-16 w-16" />}
          </div>
          {device.featured && (
            <div className="absolute left-3 top-3 rounded-full bg-warning px-3 py-1 text-[10px] text-warning-foreground font-bold shadow-md">
              TOP ITEM
            </div>
          )}
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h3 className="font-bold text-base leading-tight text-card-foreground">{device.name}</h3>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">{device.type}</span>
          </div>
        </div>

        {/* Status and Actions */}
        <div className="mt-4 flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-1.5">
            <Circle 
              className={`h-2 w-2 ${isAvailable ? "fill-success text-success" : "fill-destructive text-destructive"}`} 
              aria-hidden="true"
            />
            <span className={`text-xs font-semibold ${isAvailable ? "text-success" : "text-destructive"}`}>
              {device.status}
            </span>
          </div>
          <Button 
            asChild
            size="sm" 
            variant={isAvailable ? "default" : "secondary"}
            className="h-8 px-4 text-xs font-semibold rounded-lg z-10 relative"
            aria-label={isAvailable ? `Borrow ${device.name}` : `Request ${device.name}`}
          >
            <Link to="/devices/$deviceId" params={{ deviceId: device.id }} onClick={(e) => e.stopPropagation()}>
              {isAvailable ? "Borrow" : "Request"}
            </Link>
          </Button>
        </div>
      </Card>
    </article>
  )
}
