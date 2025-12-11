import { useAuth0 } from "@/contexts/AuthContext"
import type { ReactNode } from "react"  
import { Button } from "@/components/ui/button"
import { LogIn, Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Authentication Required</h2>
          <p className="text-muted-foreground">
            Please log in to access this page.
          </p>
        </div>
        <Button onClick={() => loginWithRedirect()} className="gap-2">
          <LogIn className="h-4 w-4" />
          Log in to continue
        </Button>
      </div>
    )
  }

  return <>{children}</>
}

