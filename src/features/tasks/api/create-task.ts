import { addDoc, collection, doc, setDoc } from 'firebase/firestore'

import { auth, db } from '@/configs/firebase'
import { datetimeSchema, timestampSchema } from '@/lib/schema'
import { Task, TaskStatus } from '@/types/api'
import { z } from 'zod'

export const TASKS_COLLECTION = 'tasks'

export const createTaskInputSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string())
})

export type CreateTaskInput = z.infer<typeof createTaskInputSchema>

export const createTask = async ({
  data
}: {
  data: CreateTaskInput
}): Promise<Task> => {
  if (!auth.currentUser) {
    throw new Error('User not logged in')
  }

  const validatedData = createTaskInputSchema.parse(data)

  const taskData = {
    ...validatedData,
    created_at: timestampSchema.parse(new Date()),
    created_time: datetimeSchema.parse(new Date()),
    status: 'PENDING' as TaskStatus,
    uid: auth.currentUser.uid
  }

  const { id } = await addDoc(collection(db, TASKS_COLLECTION), taskData)

  await setDoc(doc(db, TASKS_COLLECTION, id), { id }, { merge: true })

  return { ...taskData, id }
}
