import { doc, getDoc } from 'firebase/firestore'

import { db } from '@/configs/firebase'
import { User } from '@/types/api'

export const getUser = async (uid: string): Promise<User | null> => {
  try {
    const userSnap = await getDoc(doc(db, 'users', uid))
    if (userSnap.exists()) return userSnap.data() as User
    return null
  } catch (e) {
    console.error('Error in getUser', e)
    throw new Error('Error while fetching user details')
  }
}
