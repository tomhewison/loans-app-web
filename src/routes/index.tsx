import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Laptop, 
  Tablet, 
  Camera, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Shield,
  Sparkles,
  Users,
  Calendar
} from 'lucide-react'
import studentsImage from "@/assets/students.jpg"
import tessideLogo from "@/assets/tesside.png"
import { useDeviceModels } from '@/hooks/useCatalogue'

export const Route = createFileRoute('/')({
  component: Index,
})

const features = [
  {
    icon: Clock,
    title: "Quick Pickup",
    description: "Reserve online, collect from Campus IT within the hour"
  },
  {
    icon: Shield,
    title: "Fully Insured",
    description: "All devices covered for accidental damage during your loan"
  },
  {
    icon: Calendar,
    title: "Flexible Loans",
    description: "Borrow for a day, a week, or the whole semester"
  }
]

const categories = [
  { name: "Laptops", icon: Laptop, description: "MacBooks, ThinkPads & more", color: "from-blue-500 to-cyan-500" },
  { name: "Tablets", icon: Tablet, description: "iPads & Surface devices", color: "from-purple-500 to-pink-500" },
  { name: "Cameras", icon: Camera, description: "DSLRs & mirrorless", color: "from-orange-500 to-red-500" },
]

function Index() {
  const { data: deviceModels } = useDeviceModels()
  const featuredDevices = deviceModels?.filter(d => d.featured).slice(0, 3) || []

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl min-h-[500px] flex items-center max-w-full mx-auto">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${studentsImage})` }}
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 px-8 md:px-12 py-16 w-full max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-white/90 font-medium">Free for all students</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Borrow tech for your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              studies & projects
            </span>
          </h1>
          
          <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-lg">
            Access laptops, tablets, cameras and more from Campus IT. 
            Reserve online, pick up on campus, and focus on what matters.
          </p>
          
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg" className="gap-2 text-base px-6">
              <Link to="/catalogue">
                Browse Catalogue
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 text-base px-6 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white">
              <Link to="/help">
                How it works
              </Link>
            </Button>
          </div>
          
          <div className="mt-10 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="text-white/80 text-sm">
              <span className="font-semibold text-white">500+</span> students using Campus Loans
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-card-foreground">Why Campus Loans?</h2>
          <p className="text-muted-foreground mt-2">Simple, fast, and designed for students</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="p-6 rounded-2xl border-0 bg-card shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground">{feature.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-card-foreground">Browse by Category</h2>
            <p className="text-muted-foreground mt-1">Find the perfect device for your needs</p>
          </div>
          <Button asChild variant="ghost" className="gap-2">
            <Link to="/catalogue">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.name}
              to="/catalogue"
              className="group relative overflow-hidden rounded-2xl p-8 min-h-[200px] flex flex-col justify-end"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              
              <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-30 transition-opacity">
                <category.icon className="h-24 w-24 text-white" />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                <p className="text-white/80 text-sm mt-1">{category.description}</p>
              </div>
              
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="h-6 w-6 text-white" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Devices */}
      {featuredDevices.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-card-foreground">Popular Right Now</h2>
              <p className="text-muted-foreground mt-1">Most requested devices this month</p>
            </div>
            <Button asChild variant="ghost" className="gap-2">
              <Link to="/catalogue">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {featuredDevices.map((device) => (
              <Link key={device.id} to="/devices/$deviceId" params={{ deviceId: device.id }}>
                <Card className="p-5 rounded-2xl border-0 bg-card shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 group">
                  <div className="aspect-[4/3] w-full flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl overflow-hidden mb-4">
                    {device.imageUrl ? (
                      <img src={device.imageUrl} alt={`${device.brand} ${device.model}`} className="w-full h-full object-cover" />
                    ) : (
                      <Laptop className="h-16 w-16 text-neutral-300" />
                    )}
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                        {device.brand} {device.model}
                      </h3>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">{device.category}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-accent p-10 md:p-14">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to get started?</h2>
          <p className="text-white/80 mt-4 text-lg">
            Browse our catalogue, find what you need, and reserve in seconds. 
            It's that simple.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="gap-2 text-base px-8">
              <Link to="/catalogue">
                Browse Catalogue
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-8 py-8 text-center md:text-left">
        <img src={tessideLogo} alt="Teesside University" className="h-12 opacity-60" />
        <div className="flex items-center gap-2 text-muted-foreground">
          <CheckCircle className="h-5 w-5 text-success" />
          <span>Official Campus IT Service</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="h-5 w-5 text-primary" />
          <span>Available to all registered students</span>
        </div>
      </section>
    </div>
  )
}
