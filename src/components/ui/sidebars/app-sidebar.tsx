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
import { TaskTagDialog } from '@/features/tasks/components/task-tag-dialog'
import React from 'react'
import { useAppStore } from '@/stores/use-app-store'

const defaultApps = {
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
      list: []
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
      list: []
    }
  }
} as SidebarApps

const extractAppPath = (pathname: string) => {
  const paths = pathname.split('/').filter(Boolean)
  return paths.length > 1 ? paths[1] : ''
}

export const AppSidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { apps } = useAppStore()

  const [sidebarApps, setSidebarApps] = React.useState<SidebarApps>(defaultApps)

  const appId = extractAppPath(location.pathname)
  const app = sidebarApps[appId]

  const handleRoute = (id: string) => navigate(`/app/${id}`)

  React.useEffect(() => {
    if (apps) {
      setSidebarApps((prev) => ({
        ...prev,
        tasks: {
          ...prev.tasks,
          custom: {
            ...prev.tasks.custom,
            list: apps.task_tags.map((tag) => ({
              title: tag.name,
              path: tag.id
            }))
          }
        }
      }))
    }
  }, [apps])

  console.log('sidebar task tags', apps)

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
        {app.custom && (
          <SidebarGroup>
            <SidebarGroupLabel className="justify-between">
              {app.custom.name}
              <TaskTagDialog />
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {app.custom.list.length > 0 ? (
                  app.custom.list.map((item) => (
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
                  ))
                ) : (
                  <SidebarMenuItem>
                    <span className="flex h-20 w-full items-center justify-center text-xs text-muted-foreground">
                      Empty
                    </span>
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
