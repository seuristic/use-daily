import { collection, getDocs, query, where } from 'firebase/firestore'

import { auth, db } from '@/configs/firebase'
import { TaskTag } from '@/types/api'
import { TASK_TAGS_COLLECTION } from './create-task-tag'

export const getTaskTags = async (): Promise<TaskTag[]> => {
  if (!auth.currentUser) {
    throw new Error('User not logged in')
  }

  const q = query(
    collection(db, TASK_TAGS_COLLECTION),
    where('uid', '==', auth.currentUser.uid)
  )
  const docRef = await getDocs(q)
  const data = docRef.docs.map((doc) => doc.data() as TaskTag)

  return data
}
