import { db } from '@/configs/firebase'
import { datetimeSchema, timestampSchema } from '@/lib/schema'
import { Task } from '@/types/api'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { z } from 'zod'

export const TASKS_COLLECTION = 'tasks'

export const createTaskInputSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(['COMPLETED', 'IN_PROGRESS', 'PENDING']),
  uid: z.string(),
  created_at: timestampSchema,
  created_time: datetimeSchema,
  tags: z.array(z.string())
})

export type CreateTaskInput = z.infer<typeof createTaskInputSchema>

export const createTask = async ({
  data
}: {
  data: CreateTaskInput
}): Promise<Task> => {
  const docRef = await addDoc(collection(db, TASKS_COLLECTION), data)

  await setDoc(doc(db, TASKS_COLLECTION, docRef.id), { id: docRef.id })

  return { ...data, id: docRef.id }
}
