import { doc, setDoc, Timestamp } from 'firebase/firestore'
import { User as AuthUser } from 'firebase/auth'

import { db } from '@/configs/firebase'
import { User } from '@/types/api'

export const createUser = async (user: AuthUser): Promise<User> => {
  const docData = {
    display_name: user.displayName,
    email: user.email,
    photo_url: user.photoURL,
    uid: user.uid,
    created_at: Timestamp.now().toDate().toISOString(),
    created_ts: Timestamp.now().seconds
  }

  await setDoc(doc(db, 'users', user.uid), docData)

  return docData
}
