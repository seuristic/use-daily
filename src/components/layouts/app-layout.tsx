import { ReactNode } from 'react'
import { SidebarProvider } from '../ui/sidebar'
import { AppSidebar } from '../ui/sidebars'
import { Head } from '../ui/seo'
import { AppNavbar } from '../navbars/app-navbar'
import { Navigate, useLocation } from 'react-router-dom'

type AppSidebarProps = {
  children: ReactNode
  title?: string
}

export const AppLayout = ({ children, title }: AppSidebarProps) => {
  const location = useLocation()

  if (['/app', '/app/'].includes(location.pathname)) {
    return <Navigate to="tasks" />
  }

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
