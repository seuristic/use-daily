import { User } from '@/types/api'
import { create } from 'zustand'

type State = {
  user: User | null
  loading: boolean
}

type Action = {
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<State & Action>()((set) => ({
  user: null,
  loading: true,
  setLoading: (loading) => set(() => ({ loading })),
  setUser: (user) => set(() => ({ user }))
}))
