import { doc, setDoc } from 'firebase/firestore'
import { User as AuthUser } from 'firebase/auth'

import { db } from '@/configs/firebase'

export const createUser = async (user: AuthUser) => {
  try {
    const data = {
      display_name: user.displayName,
      email: user.email,
      photo_url: user.photoURL,
      uid: user.uid,
      created_at: Date.now(),
      created_time: new Date().toUTCString()
    }
    await setDoc(doc(db, 'users', user.uid), data)
    return data
  } catch (e) {
    console.error('Error in createUser', e)
    throw new Error('Error while creating new user')
  }
}
