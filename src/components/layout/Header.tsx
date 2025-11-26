import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import { Link } from "@tanstack/react-router"
import tessideLogo from "@/assets/tesside.png"

export default function Header() {
  const { isDarkMode, toggleDarkMode } = useTheme()

  return (
    <div className="mb-2">
      <header className="mb-4 flex items-center justify-between px-5 py-3.5 rounded-xl border-0 shadow-[0_2px_8px_rgba(0,0,0,0.06)]" style={{ backgroundColor: 'var(--card)', opacity: 1 }}>
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={tessideLogo} alt="Teesside University" width={45} height={36} className="shrink-0" />
            <div>
              <div className="text-base font-bold leading-tight">Campus Loans</div>
              <div className="text-[10px] text-muted-foreground leading-tight">Device lending by Campus IT</div>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2.5">
          <Link 
            to="/reservations"
            className="relative inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border bg-background text-sm hover:bg-accent transition-colors"
            aria-label="View reservations"
          >
            <span className="text-sm">Reservations</span>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-[10px] font-semibold">2</span>
          </Link>

          <Link to="/help">
            <Button variant="ghost" size="sm" className="hidden md:inline-flex hover:text-primary">Help</Button>
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-accent transition-colors"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4 text-primary" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground font-medium" aria-label="User account">AB</div>
        </div>
      </header>
    </div>
  )
}
