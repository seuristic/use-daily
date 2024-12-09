import { onAuthStateChanged, User } from 'firebase/auth'
import { ReactNode, useCallback, useEffect } from 'react'

import { auth } from '@/configs/firebase'
import { useAuth } from '@/hooks/use-auth'
import { getUser } from '../api/get-user'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setUser } = useAuth()

  const handleUser = useCallback(
    async (user: User | null) => {
      if (user) {
        try {
          const userData = await getUser(user.uid)
          setUser(userData)
        } catch (e) {
          console.error('Error in handleUser', e)
          setUser(null)
        }
      } else {
        setUser(null)
      }
    },
    [setUser],
  )

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleUser)
    return () => unsubscribe()
  }, [handleUser, setUser])

  return children
}
