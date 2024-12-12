import { signInWithPopup, signOut } from 'firebase/auth'
import { create } from 'zustand'

import { auth, provider } from '@/configs/firebase'
import { createUser } from '@/features/auth/api/create-user'
import { getUser } from '@/features/auth/api/get-user'
import { UserContext } from '@/types/api'

export const useAuth = create<UserContext>()((set) => ({
  user: undefined,
  setUser: (user) => set(() => ({ user }))
}))

export const login = async (callback?: () => void) => {
  try {
    const response = await signInWithPopup(auth, provider)
    const existingUser = await getUser(response.user.uid)

    if (!existingUser) {
      const newUser = await createUser(response)
      return newUser
    }

    if (callback) callback()

    return existingUser
  } catch (e) {
    await logout()
    console.error('Error in login', e)
    throw new Error('Error while authenticating with Google')
  }
}

export const logout = async (callback?: () => void) => {
  try {
    await signOut(auth)

    if (callback) callback()
  } catch (e) {
    console.error('Error in logout', e)
    throw new Error('Error while logging out')
  }
}
