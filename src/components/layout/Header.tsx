import { Button } from "@/components/ui/button"
import { Moon, Sun, LogIn, LogOut, User } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import { useAuth } from "@/contexts/AuthContext"
import { Link } from "@tanstack/react-router"
import tessideLogo from "@/assets/tesside.png"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const { isDarkMode, toggleDarkMode } = useTheme()
  const { isAuthenticated, isLoading, user, isStaff, login, logout } = useAuth()

  const handleLogin = () => {
    login()
  }

  const handleLogout = () => {
    logout()
  }

  // Get user initials for avatar
  const getInitials = () => {
    if (!user?.name) return "?"
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 py-3 border-b border-border bg-card shadow-sm">
      <div className="container mx-auto flex items-center justify-between w-full">
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
          <Link to="/catalogue">
            <Button variant="ghost" size="sm" className="hover:text-primary">Catalogue</Button>
          </Link>

          {isAuthenticated && (
            <Link
              to="/reservations"
              className="relative inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border bg-background text-sm hover:bg-accent transition-colors"
              aria-label="View reservations"
            >
              <span className="text-sm">Reservations</span>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-[10px] font-semibold">2</span>
            </Link>
          )}

          {/* Admin Menu (Staff Only) */}
          {isAuthenticated && isStaff && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hover:text-primary gap-1.5">
                  Admin
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-white text-[9px] font-bold">
                    ★
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Admin Tools</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/admin/dashboard" className="cursor-pointer">
                    Dashboard
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/admin/reservations" className="cursor-pointer">
                    All Reservations
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/admin/overdue" className="cursor-pointer text-red-600">
                    Overdue Loans
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/admin/pending" className="cursor-pointer">
                    Pending Collections
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

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

          {/* Auth Button / User Menu */}
          {isLoading ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          ) : isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                  aria-label="User menu"
                >
                  {user?.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name || "User"}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    getInitials()
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/reservations" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    My Reservations
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={handleLogin}
              className="gap-1.5"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Log in</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
