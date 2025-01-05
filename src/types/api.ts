export type Flatten<T> = {
  [K in keyof T]: T[K]
}

export type BaseEntity = {
  id: string
  created_at: string
  created_timestamp: number
}

export type Entity<T> = Flatten<T & BaseEntity>

export type UserEntity<T> = Flatten<
  Entity<T> & {
    uid: string
  }
>

export type User = Omit<
  UserEntity<{
    display_name: string | null
    email: string | null
    photo_url: string | null
  }>,
  'id'
>

export const TASK_STATUS = {
  COMPLETED: 'COMPLETED',
  IN_PROGRESS: 'IN_PROGRESS',
  PENDING: 'PENDING'
} as const

export type TaskStatus = keyof typeof TASK_STATUS

export type Task = UserEntity<{
  title: string
  description: string
  status: TaskStatus
  tags: string[]
}>

export type TaskTag = UserEntity<{
  id: string
  name: string
}>

export type Apps = {
  // tasks: Task[]
  task_tags: TaskTag[]
}
