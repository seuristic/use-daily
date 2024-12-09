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
