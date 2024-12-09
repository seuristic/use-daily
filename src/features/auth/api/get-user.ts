import { doc, getDoc } from 'firebase/firestore'

import { db } from '@/configs/firebase'
import { User } from '@/types/api'

export const getUser = async (uid: string): Promise<User | null> => {
  try {
    const userRef = doc(db, 'users', uid)
    const userSnap = await getDoc(userRef)

    return userSnap.exists() ? (userSnap.data() as User) : null
  } catch (e) {
    console.error('Error in getUser', e)
    throw new Error('Error while fetching user')
  }
}
