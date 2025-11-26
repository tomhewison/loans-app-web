import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Laptop, Tablet, Camera, Package, Grid3x3, X, Calendar } from "lucide-react"
import { useState } from "react"

const categoryIcons: Record<string, React.ReactNode> = {
  All: <Grid3x3 className="h-4 w-4" />,
  Laptops: <Laptop className="h-4 w-4" />,
  Tablets: <Tablet className="h-4 w-4" />,
  Cameras: <Camera className="h-4 w-4" />,
  Accessories: <Package className="h-4 w-4" />,
}

export default function SidebarFilters({ categories = [] as string[] }: { categories?: string[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [availableOnly, setAvailableOnly] = useState(false)

  // Date states
  const today = new Date().toISOString().split('T')[0]
  const [startDate, setStartDate] = useState(today)
  const [selectedDuration, setSelectedDuration] = useState<string>("1 week")
  
  const durationPresets = [
    { label: "1 day", days: 1 },
    { label: "3 days", days: 3 },
    { label: "1 week", days: 7 },
    { label: "1 month", days: 30 },
    { label: "1 semester", days: 90 }
  ]

  const calculateEndDate = (start: string, duration: string) => {
    const days = durationPresets.find(p => p.label === duration)?.days || 7
    const startDateObj = new Date(start)
    const endDateObj = new Date(startDateObj.getTime() + days * 24 * 60 * 60 * 1000)
    return endDateObj.toISOString().split('T')[0]
  }

  const endDate = calculateEndDate(startDate, selectedDuration)

  const handleResetDates = () => {
    setStartDate(today)
    setSelectedDuration("1 week")
  }

  return (
    <aside className="col-span-1 md:col-span-1">
      <Card className="sticky top-6 p-5 rounded-2xl border-0 bg-card shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        {/* Rental Dates */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-card-foreground">Rental Dates</h3>
            <button
              onClick={handleResetDates}
              className="text-xs text-muted-foreground hover:text-card-foreground transition-colors flex items-center gap-1"
              aria-label="Reset rental dates"
            >
              <X className="h-3 w-3" />
              Reset
            </button>
          </div>
          
          <div className="space-y-3">
            {/* Start Date */}
            <div>
              <label className="text-xs text-neutral-600 mb-1.5 block">Start Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={today}
                  className="w-full pl-10 pr-3 py-2 rounded-lg border-0 bg-input text-sm font-medium text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 cursor-pointer"
                  aria-label="Select start date"
                />
              </div>
            </div>

            {/* Duration Presets */}
            <div>
              <label className="text-xs text-neutral-600 mb-2 block">Duration</label>
              <div className="grid grid-cols-2 gap-2">
                {durationPresets.map((preset) => {
                  const isActive = selectedDuration === preset.label
                  return (
                    <button
                      key={preset.label}
                      onClick={() => setSelectedDuration(preset.label)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-input text-card-foreground hover:bg-neutral-100"
                      }`}
                      aria-pressed={isActive}
                    >
                      {preset.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* End Date Display */}
            <div className="pt-2 border-t border-border">
              <p className="text-xs text-neutral-600">
                End Date: <span className="font-semibold text-card-foreground">{new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mb-5 pt-5 border-t border-border">
          <h3 className="text-sm font-bold mb-4 text-card-foreground">Category</h3>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => {
              const isActive = selectedCategory === category
              return (
                <Button
                  key={category}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  className={`h-10 justify-start gap-2 text-xs font-semibold rounded-lg ${isActive ? "shadow-md" : ""}`}
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={isActive}
                  aria-label={`Filter by ${category}`}
                >
                  {categoryIcons[category]}
                  <span>{category}</span>
                </Button>
              )
            })}
          </div>
        </div>

        <div className="mb-4 pt-5 border-t border-border">
          <h3 className="text-sm font-bold mb-4 text-card-foreground">Filter</h3>
          <div className="flex items-center gap-2">
            <Checkbox
              id="available-only"
              checked={availableOnly}
              onCheckedChange={(checked: boolean) => setAvailableOnly(checked)}
              aria-label="Show only available devices"
            />
            <label
              htmlFor="available-only"
              className="text-sm text-muted-foreground cursor-pointer hover:text-primary transition-colors"
            >
              Available only
            </label>
          </div>
        </div>
      </Card>
    </aside>
  )
}
