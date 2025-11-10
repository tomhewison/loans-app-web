import ProductCard from "@/components/landing/ProductCard"
import { ArrowUpDown, Search } from "lucide-react"
import { useState } from "react"

type Device = {
  id: string
  name: string
  type: string
  status: string
  price: string
  featured?: boolean
}

const allCategories = ["All Categories", "Laptops", "Tablets", "Cameras", "Accessories", "Available", "Featured"]

export default function CatalogueGrid({ devices }: { devices: Device[] }) {
  const [sortBy, setSortBy] = useState<string>("popular")
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories")

  return (
    <section className="md:col-span-3">
      {/* Search bar */}
      <div className="mb-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search devices..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border-0 bg-card shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
            aria-label="Search devices"
          />
        </div>
      </div>

      {/* Category tags */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex items-center gap-2 pb-2">
          {allCategories.map((category) => {
            const isActive = selectedCategory === category
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card text-card-foreground shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
                }`}
                aria-pressed={isActive}
              >
                {category}
              </button>
            )
          })}
        </div>
      </div>

      {/* Header with sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-card-foreground">
            {devices.length} {devices.length === 1 ? "device" : "devices"} available
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
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-8 pr-4 py-2 rounded-lg border-0 bg-card shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 appearance-none cursor-pointer w-full sm:w-auto"
              aria-label="Sort devices"
            >
              <option value="popular">Most popular</option>
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="featured">Featured first</option>
              <option value="available">Available first</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid - Responsive: 1 col mobile, 2 cols tablet, 3 cols desktop */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {devices.map((d) => (
          <ProductCard key={d.id} device={d} />
        ))}
      </div>
    </section>
  )
}
