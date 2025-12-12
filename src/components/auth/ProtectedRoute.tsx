import { useAuth0 } from "@/contexts/AuthContext"
import type { ReactNode } from "react"
import { Loader2 } from "lucide-react"
import UnauthorizedView from "../layout/Unauthorized"

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <UnauthorizedView />
  }

  return <>{children}</>
}

