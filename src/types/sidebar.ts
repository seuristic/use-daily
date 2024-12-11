import { ComponentType } from 'react'

export type SidebarAppItem = {
  title: string
  path: string
  icon: ComponentType
}

export type SidebarApp = {
  name: string
  path: string
  items: SidebarAppItem[]
}

export type SidebarApps = {
  [key: string]: SidebarApp
}
