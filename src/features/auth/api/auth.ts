import { signInWithPopup, signOut } from 'firebase/auth'

import { auth, provider } from '@/configs/firebase'
import { createUser } from '@/features/auth/api/create-user'
import { getUser } from '@/features/auth/api/get-user'

export const login = async () => {
  try {
    const { user } = await signInWithPopup(auth, provider)
    const existingUser = await getUser(user.uid)
    if (!existingUser) return await createUser(user)
    return existingUser
  } catch (e) {
    console.error('Error in login', e)
    throw new Error('Error while authenticating with Google')
  }
}

export const logout = async () => {
  try {
    await signOut(auth)
  } catch (e) {
    console.error('Error in logout', e)
    throw new Error('Error while logging out')
  }
}
