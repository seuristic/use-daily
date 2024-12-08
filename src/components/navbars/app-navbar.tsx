// import { Link } from "react-router-dom"

// import { capitalize, cn } from "@/lib/utils"
// import { ModeToggle, useTheme } from "../theme"
import { ModeToggle } from "../theme"
import { SidebarTrigger } from "../ui/sidebar"

export const AppNavbar = () => {
  // const { theme } = useTheme()

  return (
    <nav className="sticky top-0 z-50 w-full p-2">
      <div className="">
        <div className="flex items-center justify-between">
          <SidebarTrigger variant="outline" className="size-10" />
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}
