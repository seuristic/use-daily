import { Link } from "react-router-dom"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"

export function LandingRoute() {
  return (
    <main>
      <Navbar />
      <div className="w-full overflow-x-hidden">
        <div className="relative mx-auto flex h-svh max-w-screen-xl flex-col items-center justify-center gap-y-20 px-4 md:px-8">
          <div className="z-10 flex w-full flex-col items-center gap-y-12 text-center">
            <h1 className="md:text-responsive-lg text-responsive-md font-bold leading-[1]">
              Elevate Productivity
            </h1>
            <p className="max-w-screen-md text-xl text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              odit excepturi sapiente laboriosam suscipit tenetur ipsum!
            </p>
          </div>
          <div className="flex items-center justify-center gap-x-4">
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/login">Already a user? Login</Link>
            </Button>
          </div>
          <div className="bg-gradient absolute left-1/2 top-1/2 size-[256px] translate-x-full rounded-full bg-muted-foreground/50 blur-[1024px]" />
          <div className="bg-gradient absolute left-0 top-0 size-[256px] -translate-y-1/2 rounded-full bg-muted-foreground/50 blur-[1024px]" />
        </div>
        <div id="features" className="flex h-dvh w-full bg-muted-foreground/50">
          <p className="m-auto">Let's make bang!</p>
        </div>
      </div>
    </main>
  )
}
