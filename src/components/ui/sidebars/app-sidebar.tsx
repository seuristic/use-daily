import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ChevronDownIcon,
  InboxIcon,
  CalendarCheckIcon,
  CalendarPlusIcon,
  CircleDashedIcon,
  CircleDotDashedIcon,
  CircleDotIcon,
  HashIcon
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
  SidebarMenuItem
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
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
        path: 'today',
        icon: CalendarCheckIcon
      },
      {
        title: 'Tomorrow',
        path: 'tomorrow',
        icon: CalendarPlusIcon
      },
      {
        title: 'Pending',
        path: 'pending',
        icon: CircleDashedIcon
      },
      {
        title: 'In-Progress',
        path: 'in-progress',
        icon: CircleDotDashedIcon
      },
      {
        title: 'Completed',
        path: 'completed',
        icon: CircleDotIcon
      }
    ],
    custom: {
      name: 'Tags',
      list: [
        {
          title: 'Tag 1',
          path: 'tag-1'
        },
        {
          title: 'Tag 2',
          path: 'tag-2'
        },
        {
          title: 'Tag 3',
          path: 'tag-3'
        },
        {
          title: 'Tag 4',
          path: 'tag-4'
        }
      ]
    }
  },
  notes: {
    name: 'Quick Notes',
    path: 'notes',
    items: [
      {
        title: 'Inbox',
        path: 'inbox',
        icon: InboxIcon
      }
    ],
    custom: {
      name: 'Lists',
      list: [
        {
          title: 'List 1',
          path: 'list-1'
        },
        {
          title: 'List 2',
          path: 'list-2'
        },
        {
          title: 'List 3',
          path: 'list-3'
        }
      ]
    }
  }
}

const extractAppPath = (pathname: string) => {
  const paths = pathname.split('/').filter(Boolean)
  return paths.length > 1 ? paths[1] : ''
}

export const AppSidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const appId = extractAppPath(location.pathname)
  const app = apps[appId]
  const appCustom = 'custom' in app && app.custom ? app.custom : null

  const handleRoute = (id: string) => navigate(`/app/${id}`)

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {app.name}
                  <ChevronDownIcon className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                {appIdList.map((id) => (
                  <DropdownMenuItem
                    key={id}
                    className={cn(
                      appId === id &&
                        'flex items-center gap-3 bg-popover-selected'
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
            {app.items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  variant={
                    location.pathname.includes(item.path)
                      ? 'outline'
                      : 'default'
                  }
                  asChild
                >
                  <Link to={`/app/${appId}/${item.path}`} replace>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        {appCustom && (
          <SidebarGroup>
            <SidebarGroupLabel>{appCustom.name}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {appCustom.list.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      variant={
                        location.pathname.includes(item.path)
                          ? 'outline'
                          : 'default'
                      }
                      asChild
                    >
                      <Link to={`/app/${appId}/custom/${item.path}`} replace>
                        <HashIcon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  )
}
