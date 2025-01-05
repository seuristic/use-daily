import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ChevronDownIcon,
  InboxIcon,
  CalendarCheckIcon,
  CalendarPlusIcon,
  CircleDashedIcon,
  CircleDotDashedIcon,
  CircleDotIcon,
  HashIcon,
  Loader2Icon
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
import { TaskTagDialog } from '@/features/tasks/components/task-tag-dialog'
import React from 'react'
import { useAppStore } from '@/stores/use-app-store'
import { SidebarCustomDropdown } from './custom-dropdown'

const defaultApps = {
  tasks: {
    name: 'Track Tasks',
    path: 'tasks',
    items: [
      {
        id: 'task-today',
        title: 'Today',
        path: 'today',
        icon: CalendarCheckIcon
      },
      {
        id: 'task-tomorrow',
        title: 'Tomorrow',
        path: 'tomorrow',
        icon: CalendarPlusIcon
      },
      {
        id: 'task-upcoming',
        title: 'Pending',
        path: 'pending',
        icon: CircleDashedIcon
      },
      {
        id: 'task-in-progress',
        title: 'In-Progress',
        path: 'in-progress',
        icon: CircleDotDashedIcon
      },
      {
        id: 'task-completed',
        title: 'Completed',
        path: 'completed',
        icon: CircleDotIcon
      }
    ],
    custom: {
      name: 'Tags',
      list: []
    }
  },
  notes: {
    name: 'Quick Notes',
    path: 'notes',
    items: [
      {
        id: 'notes-all',
        title: 'Inbox',
        path: 'inbox',
        icon: InboxIcon
      }
    ],
    custom: {
      name: 'Lists',
      list: []
    }
  }
} as SidebarApps

const extractAppPath = (pathname: string) => {
  const paths = pathname.split('/').filter(Boolean)
  return paths.length > 1 ? paths[1] : ''
}

const customItemsMap = {
  tasks: 'task_tags'
} as const

export const AppSidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { apps, loading } = useAppStore()

  const [sidebarApps, setSidebarApps] = React.useState<SidebarApps>(defaultApps)

  const appId = extractAppPath(location.pathname) as keyof typeof customItemsMap
  const app = sidebarApps[appId]

  const handleRoute = (id: string) => navigate(`/app/${id}`)

  React.useEffect(() => {
    if (appId.length > 0 && apps) {
      const customItems = apps[customItemsMap[appId]]
      setSidebarApps((prev) => ({
        ...prev,
        tasks: {
          ...prev.tasks,
          custom: {
            ...prev.tasks.custom,
            list: customItems.map(({ name, id }) => ({
              id,
              title: name,
              path: id
            }))
          }
        }
      }))
    }
  }, [apps, appId])

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
                {Object.keys(sidebarApps).map((id) => (
                  <DropdownMenuItem
                    key={id}
                    className={cn(
                      appId === id &&
                        'flex items-center gap-3 bg-popover-selected'
                    )}
                    onClick={() => handleRoute(id)}
                  >
                    <span>{sidebarApps[id].name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Routes */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {app.items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  isActive={location.pathname.includes(item.path)}
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

        {/* Custom Routes */}
        {app.custom && (
          <SidebarGroup>
            <SidebarGroupLabel className="justify-between">
              {app.custom.name}
              <TaskTagDialog />
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {loading ? (
                  <SidebarMenuItem>
                    <span className="flex h-20 w-full items-center justify-center text-xs text-muted-foreground">
                      <Loader2Icon className="animate-spin" />
                    </span>
                  </SidebarMenuItem>
                ) : app.custom.list.length > 0 ? (
                  app.custom.list.map((item) => {
                    const customItemPath = `/app/${appId}/custom/${item.path}`
                    return (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          tooltip={
                            item.title.length > 20 ? item.title : undefined
                          }
                          isActive={location.pathname.includes(item.path)}
                          asChild
                        >
                          <Link to={customItemPath} replace>
                            <HashIcon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                        <SidebarCustomDropdown />
                      </SidebarMenuItem>
                    )
                  })
                ) : (
                  <SidebarMenuItem>
                    <div className="flex h-20 w-full items-center justify-center text-xs text-muted-foreground">
                      Empty
                    </div>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  )
}
