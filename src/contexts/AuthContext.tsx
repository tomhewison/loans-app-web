import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

// API base URL for auth endpoints
const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '').replace(/\/proxy$/, '')

interface User {
  sub: string
  email?: string
  name?: string
  picture?: string
  nickname?: string
  roles?: string[]
  permissions?: string[]
  [key: string]: unknown
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isStaff: boolean
  isLoading: boolean
  login: (returnUrl?: string) => void
  logout: (returnUrl?: string) => void
  checkAuthStatus: () => Promise<void>
  hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const checkAuthStatus = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/auth/status`, {
        credentials: 'include', // Include cookies
      })

      if (response.ok) {
        const data = await response.json()
        if (data.isAuthenticated && data.user) {
          setUser(data.user)
        } else {
          setUser(null)
        }
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Failed to check auth status:', error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuthStatus()
  }, [checkAuthStatus])

  const login = useCallback((returnUrl?: string) => {
    const currentUrl = returnUrl || window.location.href
    const loginUrl = `${API_URL}/auth/login?returnUrl=${encodeURIComponent(currentUrl)}`
    window.location.href = loginUrl
  }, [])

  const logout = useCallback((returnUrl?: string) => {
    const homeUrl = returnUrl || window.location.origin
    const logoutUrl = `${API_URL}/auth/logout?returnUrl=${encodeURIComponent(homeUrl)}`
    window.location.href = logoutUrl
  }, [])

  const hasPermission = useCallback((permission: string): boolean => {
    return user?.permissions?.includes(permission) ?? false
  }, [user])

  // User is considered staff if they have any admin permission
  const isStaff = useCallback((): boolean => {
    if (!user?.permissions) return false
    const adminPermissions = ['read:reservations', 'write:reservations', 'read:devices', 'write:devices']
    return adminPermissions.some(perm => user.permissions?.includes(perm)) ?? false
  }, [user])

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isStaff: isStaff(),
    isLoading,
    login,
    logout,
    checkAuthStatus,
    hasPermission,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook to access auth context
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

/**
 * @deprecated Use useAuth instead. This is kept for backwards compatibility during migration.
 */
export function useAuth0() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth()

  return {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect: login,
    logout: () => logout(),
  }
}
