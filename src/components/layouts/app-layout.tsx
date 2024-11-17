import { ReactNode } from "react"
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar"
import { AppSidebar } from "../ui/sidebars"
import { Head } from "../ui/seo"
import { LandingNavbar } from "../navbars/landing-navbar"

type AppSidebarProps = {
  children: ReactNode
  title?: string
}

export const AppLayout = ({ children, title }: AppSidebarProps) => {
  return (
    <SidebarProvider>
      <Head title={title} />
      <AppSidebar />
      <main className="w-full">
        <LandingNavbar />
        <SidebarTrigger />
        {children}
        <div className="h-svh" />
      </main>
    </SidebarProvider>
  )
}
