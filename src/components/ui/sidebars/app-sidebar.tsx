import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ChevronDownIcon,
  InboxIcon,
  CalendarCheckIcon,
  CalendarPlusIcon,
  CircleDashedIcon,
  CircleDotDashedIcon,
  CircleDotIcon,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../dropdown-menu'
import { cn } from '@/lib/utils'
import { SidebarApps } from '@/types/sidebar'

const appIdList = ['tasks', 'notes']

const apps: SidebarApps = {
  tasks: {
    name: 'Track Tasks',
    path: 'tasks',
    items: [
      {
        title: 'Today',
        path: '#',
        icon: CalendarCheckIcon,
      },
      {
        title: 'Tomorrow',
        path: '#',
        icon: CalendarPlusIcon,
      },
      {
        title: 'Pending',
        path: '#',
        icon: CircleDashedIcon,
      },
      {
        title: 'In-Progress',
        path: '#',
        icon: CircleDotDashedIcon,
      },
      {
        title: 'Completed',
        path: '#',
        icon: CircleDotIcon,
      },
    ],
  },
  notes: {
    name: 'Quick Notes',
    path: 'notes',
    items: [
      {
        title: 'Inbox',
        path: '#',
        icon: InboxIcon,
      },
    ],
  },
}

const extractAppPath = (pathname: string) => {
  const paths = pathname.split('/').filter(Boolean)
  return paths.length > 1 ? paths[1] : ''
}

export const AppSidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const appId = extractAppPath(location.pathname)

  const handleRoute = (id: string) => navigate(`/app/${id}`)

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {apps[appId].name}
                  <ChevronDownIcon className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                {appIdList.map((id) => (
                  <DropdownMenuItem
                    key={id}
                    className={cn(
                      appId === id &&
                        'flex items-center gap-3 bg-popover-selected',
                    )}
                    onClick={() => handleRoute(id)}
                  >
                    <span>{apps[id].name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {apps[appId].items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link to={item.path}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {apps[appId].items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.path}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
