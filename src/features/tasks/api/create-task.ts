import { addDoc, collection, setDoc } from 'firebase/firestore'

import { auth, db } from '@/configs/firebase'
import { Task, TaskStatus, TASK_STATUS } from '@/types/api'
import { z } from 'zod'
import { withMetadata } from '@/lib/utils'

export const TASKS_COLLECTION = 'tasks'

export const CreateTaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  status: z
    .enum(Object.values(TASK_STATUS) as [TaskStatus])
    .default(TASK_STATUS.PENDING)
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

  const docData = withMetadata(auth.currentUser, data)

  const docRef = await addDoc(collection(db, TASKS_COLLECTION), docData)
  const docId = docRef.id

  await setDoc(docRef, { id: docId }, { merge: true })

  return { ...docData, id: docId }
}
