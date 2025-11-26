import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { themeData } from './themeData'

export type Theme = 'original' | 'ocean' | 'sunset' | 'wireframe'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Get theme from localStorage or default to 'original'
    const savedTheme = localStorage.getItem('theme') as Theme | null
    return savedTheme && ['original', 'ocean', 'sunset', 'wireframe'].includes(savedTheme) 
      ? savedTheme 
      : 'original'
  })

  const [isDarkMode, setIsDarkModeState] = useState<boolean>(() => {
    // Get dark mode preference from localStorage or default to system preference
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) {
      return saved === 'true'
    }
    // Check system preference
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  const [hasManualPreference, setHasManualPreference] = useState<boolean>(() => {
    // Check if user has manually set a preference
    return localStorage.getItem('darkMode') !== null
  })

  // Listen for system preference changes if user hasn't manually set preference
  useEffect(() => {
    if (hasManualPreference) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkModeState(e.matches)
    }

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } 
    // Fallback for older browsers
    else {
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [hasManualPreference])

  useEffect(() => {
    // Apply theme CSS variables to document root
    const root = document.documentElement
    const themeVars = themeData[theme]
    
    // Apply light or dark mode variables based on isDarkMode
    const modeVars = isDarkMode ? themeVars.dark : themeVars.light
    Object.entries(modeVars).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })
    
    // Toggle dark class on document root for CSS dark mode selectors
    if (isDarkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    
    // Set data-theme attribute for wireframe mode styling
    if (theme === 'wireframe') {
      root.setAttribute('data-theme', 'wireframe')
    } else {
      root.removeAttribute('data-theme')
    }
    
    // Save to localStorage (only if manually set)
    localStorage.setItem('theme', theme)
    if (hasManualPreference) {
      localStorage.setItem('darkMode', String(isDarkMode))
    }
  }, [theme, isDarkMode, hasManualPreference])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  const toggleDarkMode = () => {
    setHasManualPreference(true)
    setIsDarkModeState(prev => !prev)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Theme metadata for UI display
export const themeInfo: Record<Theme, { name: string; description: string; colors: { light: string; dark: string } }> = {
  original: {
    name: 'Original Purple',
    description: 'Classic purple/blue tones',
    colors: { light: '#8B5CF6', dark: '#A78BFA' }
  },
  ocean: {
    name: 'Modern Ocean',
    description: 'Fresh blue/teal tones',
    colors: { light: '#3B82F6', dark: '#60A5FA' }
  },
  sunset: {
    name: 'Warm Sunset',
    description: 'Inviting orange/amber tones',
    colors: { light: '#F97316', dark: '#FB923C' }
  },
  wireframe: {
    name: 'Wireframe',
    description: 'Minimal monochrome design',
    colors: { light: '#B8B8B8', dark: '#474747' }
  }
}

export function getThemeInfo(theme: Theme) {
  return themeInfo[theme]
}

export function getAllThemes() {
  return Object.keys(themeInfo) as Theme[]
}

