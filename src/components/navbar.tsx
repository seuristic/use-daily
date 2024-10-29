import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-10 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-foreground">
              use-daily
            </Link>
          </div>
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end">
            <div className="flex items-baseline space-x-4">
              <Link
                to="#a"
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Features
              </Link>
              <Link
                to="#b"
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Contribute
              </Link>
            </div>
            <div className="ml-4 flex items-center space-x-2">
              <Button asChild variant="outline">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
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
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="bg-background md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <Link
              to="#a"
              className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Features
            </Link>
            <Link
              to="#b"
              className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Contribute
            </Link>
          </div>
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <Button variant="outline" className="w-full justify-center">
              Login
            </Button>
            <Button className="w-full justify-center">Sign Up</Button>
          </div>
        </div>
      )}
    </nav>
  )
}
