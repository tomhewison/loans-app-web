import Hero from "@/components/landing/Hero"
import SidebarFilters from "@/components/landing/SidebarFilters"
import CatalogueGrid from "@/components/landing/CatalogueGrid"
import AIChat from "@/components/ai-chat/AIChat"

const dummyDevices = [
  { id: "1", name: "Dell Latitude 5420", type: "Laptop", status: "Available", price: "£10/day", featured: false },
  { id: "2", name: "iPad Pro 11" , type: "Tablet", status: "Checked out", price: "£6/day", featured: true },
  { id: "3", name: "Sony ZV-1", type: "Camera", status: "Available", price: "£8/day", featured: false },
  { id: "4", name: "Lenovo ThinkPad X1", type: "Laptop", status: "Available", price: "£12/day", featured: false },
  { id: "5", name: "Canon EOS M50", type: "Camera", status: "Available", price: "£7/day", featured: false },
  { id: "6", name: "Surface Pro 8", type: "Tablet", status: "Checked out", price: "£8/day", featured: false },
]

const categories = ["All", "Laptops", "Tablets", "Cameras", "Accessories"]

export default function Landing() {
  return (
    <>
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--primary) 1px, transparent 0)`,
          backgroundSize: '20px 20px',
          opacity: 0.15
        }}
      />
      <div className="relative z-10">
        <Hero />

        <div className="grid gap-6 md:grid-cols-4 mt-6">
          {/* Sidebar */}
          <SidebarFilters categories={categories} />

          {/* Catalogue */}
          <CatalogueGrid devices={dummyDevices} />
        </div>
      </div>
      <AIChat />
    </>
  )
}
