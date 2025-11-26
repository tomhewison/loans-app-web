import { Palette, Check, Moon, Sun } from "lucide-react"
import { useState } from "react"
import { useTheme, getThemeInfo, getAllThemes } from "@/contexts/ThemeContext"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

interface ThemeSelectorProps {
  variant?: 'header' | 'footer'
}

export default function ThemeSelector({ variant = 'header' }: ThemeSelectorProps) {
  const { theme, setTheme, isDarkMode, toggleDarkMode } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const themes = getAllThemes()
  const currentThemeInfo = getThemeInfo(theme)

  return (
    <div className="relative">
      {variant === 'header' ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="hidden md:inline-flex hover:text-primary gap-2"
          aria-label="Select theme"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <Palette className="h-4 w-4" />
          <span className="hidden lg:inline">Theme</span>
        </Button>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-1.5 hover:underline text-sm"
          aria-label="Select theme"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <Palette className="h-3.5 w-3.5" />
          <span>{currentThemeInfo.name}</span>
        </button>
      )}

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 bottom-full mb-2 w-56 rounded-lg border border-border bg-card shadow-lg z-50">
            <div className="p-2">
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Choose Theme
              </div>
              {/* Dark Mode Toggle */}
              <div className="px-2 py-1.5 mb-1">
                <div className="flex items-center justify-between px-3 py-2.5">
                  <div className="flex items-center gap-3">
                    <Moon className={`h-4 w-4 transition-colors ${isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                    <Sun className={`h-4 w-4 transition-colors ${!isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="font-medium text-sm text-card-foreground">Dark Mode</span>
                  </div>
                  <Switch
                    checked={isDarkMode}
                    onCheckedChange={toggleDarkMode}
                    aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                  />
                </div>
              </div>

              <Separator className="my-1" />

              {themes.map((themeOption) => {
                const themeInfo = getThemeInfo(themeOption)
                const isSelected = theme === themeOption
                return (
                  <button
                    key={themeOption}
                    onClick={() => {
                      setTheme(themeOption)
                      setIsOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                      isSelected
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-card-foreground hover:bg-accent"
                    }`}
                    aria-label={`Select ${themeInfo.name} theme`}
                    aria-pressed={isSelected}
                  >
                    <div
                      className="w-4 h-4 rounded-full border-2 border-border flex-shrink-0"
                      style={{
                        backgroundColor: isDarkMode ? themeInfo.colors.dark : themeInfo.colors.light,
                        borderColor: isSelected ? (isDarkMode ? themeInfo.colors.dark : themeInfo.colors.light) : undefined
                      }}
                    />
                    <div className="flex-1 text-left">
                      <div className="font-medium">{themeInfo.name}</div>
                      <div className="text-xs text-muted-foreground">{themeInfo.description}</div>
                    </div>
                    {isSelected && (
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

