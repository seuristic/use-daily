import { onAuthStateChanged, User } from 'firebase/auth'
import { ReactNode, useEffect } from 'react'

import { auth } from '@/configs/firebase'
import { useAuthStore } from '@/stores/use-auth-store'
import { getUser } from '../api/get-user'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setUser, setLoading } = useAuthStore()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        try {
          const existingUser = await getUser(user.uid)
          setUser(existingUser)
        } catch (e) {
          console.error('Error in unsubscribe', e)
        }
      } else {
        setUser(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [setLoading, setUser])

  return children
}
