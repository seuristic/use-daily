import { Apps } from '@/types/api'
import { create } from 'zustand'

type State = {
  apps: Apps | null
}

type Action = {
  setApps: (apps: Apps | null) => void
}

export const useAppStore = create<State & Action>()((set) => ({
  apps: null,
  setApps: (nextApps) =>
    set((apps) => (apps ? { ...apps, ...nextApps } : { ...nextApps }))
}))
