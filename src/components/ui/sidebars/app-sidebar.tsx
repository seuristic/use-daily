import { ComponentType } from 'react'
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

type Apps = {
  [key: string]: {
    name: string
    path: string
  }
}
type AppItem = {
  title: string
  url: string
  icon: ComponentType
}
type AppItems = {
  [key: string]: AppItem[]
}

const apps: Apps = {
  tasks: {
    name: 'Track Tasks',
    path: 'tasks',
  },
  notes: {
    name: 'Quick Notes',
    path: 'notes',
  },
}

const appItems: AppItems = {
  tasks: [
    {
      title: 'Today',
      url: '#',
      icon: CalendarCheckIcon,
    },
    {
      title: 'Tomorrow',
      url: '#',
      icon: CalendarPlusIcon,
    },
    {
      title: 'Pending',
      url: '#',
      icon: CircleDashedIcon,
    },
    {
      title: 'In-Progress',
      url: '#',
      icon: CircleDotDashedIcon,
    },
    {
      title: 'Completed',
      url: '#',
      icon: CircleDotIcon,
    },
  ],
  notes: [
    {
      title: 'Inbox',
      url: '#',
      icon: InboxIcon,
    },
  ],
}

const extractAppPath = (pathname: string) => {
  const paths = pathname.split('/').filter(Boolean)
  return paths.length > 1 ? paths[1] : ''
}

export const AppSidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const currentApp = extractAppPath(location.pathname)

  const handleRoute = (id: string) => navigate(`/app/${id}`)

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {apps[currentApp].name}
                  <ChevronDownIcon className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                {Object.entries(apps).map(([id, app]) => (
                  <DropdownMenuItem
                    key={id}
                    className={cn(
                      currentApp === id &&
                        'bg-popover-selected flex items-center gap-3',
                    )}
                    onClick={() => handleRoute(id)}
                  >
                    <span>{app.name}</span>
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
            {appItems[currentApp].map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link to={item.url}>
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
              {appItems[currentApp].map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
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
