import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export const NotFoundRoute = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-foreground">
      <h1 className="mb-2 text-7xl font-extrabold text-primary sm:mb-4 sm:text-8xl md:text-9xl">
        404
      </h1>
      <p className="mb-6 text-center text-lg text-muted-foreground sm:mb-8 sm:text-xl">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Button asChild size="lg" className="w-full sm:w-auto">
        <Link to="/">Go back home</Link>
      </Button>
    </div>
  )
}
