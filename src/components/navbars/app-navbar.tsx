// import { Link } from "react-router-dom"

// import { capitalize, cn } from "@/lib/utils"
// import { ModeToggle, useTheme } from "../theme"
import { UserDropdown } from '@/features/auth/components/user-dropdown'
import { ModeToggle } from '../theme'
import { SidebarTrigger } from '../ui/sidebar'

export const AppNavbar = () => {
  // const { theme } = useTheme()

  return (
    <nav className="sticky top-0 z-50 w-full p-2">
      <div className="">
        <div className="flex items-center">
          <SidebarTrigger variant="outline" className="size-10" />
          <div className="ml-auto flex items-center gap-2">
            <ModeToggle />
            <UserDropdown />
          </div>
        </div>
      </div>
    </nav>
  )
}
