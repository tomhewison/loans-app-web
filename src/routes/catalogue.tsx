import { createFileRoute, Link } from '@tanstack/react-router'
import SidebarFilters from "@/components/landing/SidebarFilters"
import CatalogueGrid from "@/components/landing/CatalogueGrid"
import AIChat from "@/components/ai-chat/AIChat"
import { ArrowLeft, X, FileText, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const categories = ["All", "Laptops", "Tablets", "Cameras", "Accessories"]

const TERMS_BANNER_KEY = 'campus-loans-terms-accepted'

export const Route = createFileRoute('/catalogue')({
  component: Catalogue,
})

function Catalogue() {
  const [showTermsBanner, setShowTermsBanner] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem(TERMS_BANNER_KEY)
    if (!accepted) {
      setShowTermsBanner(true)
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem(TERMS_BANNER_KEY, 'true')
    setShowTermsBanner(false)
  }

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
        {/* Terms Acceptance Banner */}
        {showTermsBanner && (
          <Card className="mb-6 p-4 rounded-xl border-0 bg-primary/10 border-l-4 border-l-primary shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-card-foreground mb-1">Terms & Conditions</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  By using Campus Loans, you agree to our{' '}
                  <Link to="/policies" className="text-primary hover:underline font-medium">
                    policies and terms
                  </Link>
                  . Please review loan periods, fees, and borrower responsibilities before reserving a device.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button asChild size="sm" variant="default" className="gap-1.5">
                    <Link to="/policies">
                      <FileText className="h-3.5 w-3.5" />
                      Review Terms
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleDismiss} className="gap-1.5">
                    I Understand
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 w-6 h-6 rounded-md hover:bg-background/50 flex items-center justify-center transition-colors"
                aria-label="Dismiss banner"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </Card>
        )}

        {/* Header */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <h1 className="text-3xl font-bold text-card-foreground">Device Catalogue</h1>
          <p className="text-muted-foreground mt-1">Browse and reserve devices from Campus IT</p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {/* Sidebar */}
          <SidebarFilters categories={categories} />

          {/* Catalogue */}
          <CatalogueGrid />
        </div>
      </div>
      <AIChat />
    </>
  )
}
