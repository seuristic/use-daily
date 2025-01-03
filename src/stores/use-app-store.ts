import { Apps } from '@/types/api'
import { create } from 'zustand'

type State = {
  apps: Apps
  loading: boolean
}

type Action = {
  setApps: (apps: Apps | null) => void
  setLoading: (loading: boolean) => void
}

export const useAppStore = create<State & Action>()((set) => ({
  apps: { task_tags: [] },
  loading: true,
  setApps: (nextApps) =>
    set((state) => ({
      apps: { ...state.apps, ...nextApps }
    })),
  setLoading: (loading) => set(() => ({ loading }))
}))
