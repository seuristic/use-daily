import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { logout } from '@/features/auth/api/auth'
import { UserRoundIcon } from 'lucide-react'

export function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {/* {user && user.photo_url ? (
            <img
              src={user.photo_url}
              alt="user photo"
              className="h-7 w-7 rounded-[calc(var(--radius)-6px)]"
            />
          ) : (
            <UserIcon />
          )} */}
          <UserRoundIcon />
          <span className="sr-only">User Options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="focus:bg-destructive focus:text-destructive-foreground"
          onClick={logout}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
