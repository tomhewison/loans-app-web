import type { ReactNode } from "react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative">
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
        <Header />
        <main className="flex-1 relative">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}

