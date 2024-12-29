import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Timestamp } from 'firebase/firestore'
import { User } from 'firebase/auth'
import { BaseEntity } from '@/types/api'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const capitalize = (str: string) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}

export const withMetadata = <T extends Record<string, unknown>>(
  user: User,
  data: T
): T & Omit<BaseEntity, 'id'> & { uid: string } => {
  const now = Timestamp.now()
  return {
    ...data,
    created_at: now.toDate().toISOString(),
    created_timestamp: now.toMillis(),
    uid: user.uid
  }
}
