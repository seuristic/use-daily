export type BaseEntity = {
  id: string
  created_at: number
  created_time: string
}

export type Entity<T> = {
  [K in keyof T]: T[K]
} & BaseEntity

export type User = Omit<
  Entity<{
    uid: string
    display_name: string | null
    email: string | null
    photo_url: string | null
  }>,
  'id'
>

export type UserContext = {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
}

export type TaskStatus = 'COMPLETED' | 'IN_PROGRESS' | 'PENDING'

export type Task = Entity<{
  title: string
  description?: string
  status: TaskStatus
  uid: string
  tags: string[]
}>
