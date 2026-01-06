import ProductCard from "@/components/catalogue/ProductCard"
import { ArrowUpDown, Search, Loader2 } from "lucide-react"
import { useState } from "react"
import { useDeviceModels } from "@/hooks/useCatalogue"
import { DeviceCategory } from "@/services/types"
import type { DeviceModelFilters } from "@/services/types"

const categoryFilters = [
  { label: "All Categories", value: undefined },
  { label: "Laptops", value: DeviceCategory.Laptop },
  { label: "Tablets", value: DeviceCategory.Tablet },
  { label: "Cameras", value: DeviceCategory.Camera },
  { label: "Phones", value: DeviceCategory.MobilePhone },
  { label: "Accessories", value: DeviceCategory.Other },
] as const

const sortOptions = [
  { label: "Most popular", value: "popular" },
  { label: "Newest first", value: "newest" },
  { label: "Oldest first", value: "oldest" },
  { label: "Name: A to Z", value: "name-asc" },
  { label: "Name: Z to A", value: "name-desc" },
] as const

type SortOption = typeof sortOptions[number]["value"]

export default function CatalogueGrid() {
  const [sortBy, setSortBy] = useState<SortOption>("popular")
  const [selectedCategory, setSelectedCategory] = useState<DeviceCategory | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState("")
  const [featuredOnly, setFeaturedOnly] = useState(false)

  // Build filters for the API
  const filters: DeviceModelFilters = {
    category: selectedCategory,
    search: searchQuery || undefined,
    // sort: sortBy, // TODO: Re-enable when backend sort is fixed
    featured: featuredOnly || undefined,
  }

  const { data: deviceModels, isLoading, error } = useDeviceModels(filters)

  return (
    <section className="md:col-span-3">
      {/* Search bar */}
      <div className="mb-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search devices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border-0 bg-card shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
            aria-label="Search devices"
          />
        </div>
      </div>

      {/* Category tags */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex items-center gap-2 pb-2">
          {categoryFilters.map((category) => {
            const isActive = selectedCategory === category.value
            return (
              <button
                key={category.label}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card text-card-foreground shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
                }`}
                aria-pressed={isActive}
              >
                {category.label}
              </button>
            )
          })}
          {/* Featured toggle */}
          <button
            onClick={() => setFeaturedOnly(!featuredOnly)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
              featuredOnly
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card text-card-foreground shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
            }`}
            aria-pressed={featuredOnly}
          >
            Featured
          </button>
        </div>
      </div>

      {/* Header with sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-card-foreground">
            {isLoading ? "Loading..." : `${deviceModels?.length ?? 0} ${deviceModels?.length === 1 ? "device" : "devices"} available`}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-xs text-muted-foreground sr-only">
            Sort by
          </label>
          <div className="relative">
            <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="pl-8 pr-4 py-2 rounded-lg border-0 bg-card shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 appearance-none cursor-pointer w-full sm:w-auto"
              aria-label="Sort devices"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-destructive font-medium">Failed to load devices</p>
          <p className="text-sm text-muted-foreground mt-1">{error.message}</p>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && deviceModels?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground">No devices found</p>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
        </div>
      )}

      {/* Grid - Responsive: 1 col mobile, 2 cols tablet, 3 cols desktop */}
      {!isLoading && !error && deviceModels && deviceModels.length > 0 && (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {deviceModels.map((model) => (
            <ProductCard key={model.id} deviceModel={model} />
        ))}
      </div>
      )}
    </section>
  )
}
