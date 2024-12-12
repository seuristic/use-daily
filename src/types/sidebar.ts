import { ComponentType } from 'react'

export type SidebarAppItem = {
  title: string
  path: string
  icon: ComponentType
}

export type SidebarApp = {
  title: string
  path: string
  items: SidebarAppItem[]
  custom?: {
    title: string
    list: SidebarAppItem[]
  }
}

export type SidebarApps = {
  [key: string]: SidebarApp
}
