import { addDoc, collection, setDoc, Timestamp } from 'firebase/firestore'

import { auth, db } from '@/configs/firebase'
import { Task, TaskStatus } from '@/types/api'
import { z } from 'zod'

export const TASKS_COLLECTION = 'tasks'

export const CreateTaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string())
})

export type CreateTaskForm = z.infer<typeof CreateTaskSchema>

export const createTask = async ({
  data
}: {
  data: CreateTaskForm
}): Promise<Task> => {
  if (!auth.currentUser) {
    throw new Error('User not logged in')
  }

  const docData = {
    ...data,
    created_at: Timestamp.now().toDate().toString(),
    created_ts: Timestamp.now().seconds,
    status: 'PENDING' as TaskStatus,
    uid: auth.currentUser.uid
  }

  const docRef = await addDoc(collection(db, TASKS_COLLECTION), docData)
  const docId = docRef.id

  await setDoc(docRef, { id: docId }, { merge: true })

  return { ...docData, id: docId }
}
