import { UserCredential } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

import { db } from '@/configs/firebase'
import { User } from '@/types/api'

export const createUser = async (userCredential: UserCredential) => {
  try {
    const user = userCredential.user
    const userObj: User = {
      display_name: user.displayName,
      email: user.email,
      photo_url: user.photoURL,
      uid: user.uid,
      created_at: Date.now(),
      created_time: new Date().toUTCString()
    }

    await setDoc(doc(db, 'users', user.uid), userObj)

    return userObj
  } catch (e) {
    console.error('Error in createUser', e)
    throw new Error('Error while creating new user')
  }
}
