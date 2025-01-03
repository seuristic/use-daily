import { ReactNode } from 'react'
import { SidebarProvider } from '../ui/sidebar'
import { AppSidebar } from '../ui/sidebars'
import { Head } from '../ui/seo'
import { AppNavbar } from '../navbars/app-navbar'
import { getTaskTags } from '@/features/tasks/api/get-task-tags'
import { useAppStore } from '@/stores/use-app-store'
import React from 'react'

type AppLayoutProps = {
  children: ReactNode
  title?: string
}

export const AppLayout = ({ children, title }: AppLayoutProps) => {
  const { setApps, setLoading } = useAppStore()

  React.useEffect(() => {
    const fetchTaskTags = async () => {
      const data = await getTaskTags()
      setApps({ task_tags: data })
      setLoading(false)
    }

    fetchTaskTags()
  }, [setApps, setLoading])

  return (
    <SidebarProvider>
      <Head title={title} />
      <AppSidebar />
      <main className="w-full">
        <AppNavbar />
        <div className="p-2">{children}</div>
      </main>
    </SidebarProvider>
  )
}
