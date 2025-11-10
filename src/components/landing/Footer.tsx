import { Link } from "@tanstack/react-router"
import ThemeSelector from "@/components/theme/ThemeSelector"

export default function Footer() {
  return (
    <footer className="mt-10">
      <div className="border-t pt-6 text-center text-sm text-muted-foreground">
        <div className="mb-2">Campus IT — Device Loans</div>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link to="/help" className="hover:underline">Help</Link>
          <Link to="/policies" className="hover:underline">Policies</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Theme:</span>
            <ThemeSelector variant="footer" />
          </div>
        </div>
        <div className="mt-3">© {new Date().getFullYear()} University IT</div>
      </div>
    </footer>
  )
}
