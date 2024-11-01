import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { capitalize, cn } from "@/lib/utils"
import { ModeToggle, useTheme } from "./theme"

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { theme } = useTheme()

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-foreground">
              use-daily
            </Link>
          </div>
          <div className="hidden space-x-4 md:flex md:flex-1 md:items-center md:justify-end">
            <div className="flex items-baseline gap-x-2">
              <a href="#features" className="link">
                Features
              </a>
              <a href="#contribute" className="link">
                Contribute
              </a>
            </div>
            <div className="flex items-center gap-x-4">
              <Button asChild variant="outline">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
              <ModeToggle />
            </div>
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="bg-background md:hidden">
          <div className="space-y-2">
            <Link to="#features" className={cn("link w-full")}>
              Features
            </Link>
            <Link to="#contribute" className={cn("link w-full")}>
              Contribute
            </Link>
          </div>
          <div className="space-y-2 px-4 py-4">
            <Button asChild variant="outline" className="w-full justify-center">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="w-full justify-center">
              <Link to="/signup">Sign Up</Link>
            </Button>
            <div className="flex items-center gap-x-4 text-sm md:hidden">
              <span className="text-muted-foreground">Change theme:</span>
              <div className="inline-flex items-center gap-x-2 font-medium">
                <span>{capitalize(theme)}</span>
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
