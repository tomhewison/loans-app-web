import { type ReactNode } from 'react'
import { Navigate } from '@tanstack/react-router'
import { useAuth } from '../../contexts/AuthContext'

interface StaffRouteProps {
    children: ReactNode
}

/**
 * Route guard component that ensures only staff users can access wrapped content
 * Redirects non-staff users to the home page
 */
export function StaffRoute({ children }: StaffRouteProps) {
    const { isAuthenticated, isStaff, isLoading } = useAuth()

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    if (!isAuthenticated || !isStaff) {
        return <Navigate to="/" />
    }

    return <>{children}</>
}
