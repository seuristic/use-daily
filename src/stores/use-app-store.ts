import { Apps } from '@/types/api'
import { create } from 'zustand'

type State = {
  apps: Apps
  loading: boolean
  currentApp: { id: string }
  refetched: number
}

type Action = {
  setApps: (apps: Apps | null) => void
  setLoading: (loading: boolean) => void
  setCurrentApp: (currentApp: { id: string }) => void
  refetch: () => void
}

export const useAppStore = create<State & Action>()((set) => ({
  apps: { task_tags: [] },
  loading: true,
  currentApp: { id: '' },
  refetched: 0,
  setApps: (nextApps) =>
    set((state) => ({
      apps: { ...state.apps, ...nextApps }
    })),
  setLoading: (loading) => set(() => ({ loading })),
  setCurrentApp: (currentApp) => set(() => ({ currentApp })),
  refetch: () => set((state) => ({ refetched: state.refetched + 1 }))
}))
