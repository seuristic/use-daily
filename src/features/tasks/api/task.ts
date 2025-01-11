import {
  addDoc,
  collection,
  setDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc
} from 'firebase/firestore'

import { auth, db } from '@/configs/firebase'
import { Task, TaskStatus, TASK_STATUS } from '@/types/api'
import { z } from 'zod'
import { withMetadata, withModifiedMetadata } from '@/lib/utils'

export const TASKS_COLLECTION = 'tasks'

export const TaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()).default([]),
  status: z
    .enum(Object.values(TASK_STATUS) as [TaskStatus])
    .default(TASK_STATUS.PENDING)
})

export type TaskForm = z.infer<typeof TaskSchema>

/* API: Get */
export const getTasks = async (): Promise<Task[]> => {
  if (!auth.currentUser) {
    throw new Error('User not logged in')
  }

  const q = query(
    collection(db, TASKS_COLLECTION),
    where('uid', '==', auth.currentUser.uid)
  )
  const docRef = await getDocs(q)
  const data = docRef.docs.map((doc) => doc.data() as Task)

  return data
}

/* API: Create */
export const createTask = async ({
  data
}: {
  data: TaskForm
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

/* API: Edit */
export const editTask = async ({
  id,
  data
}: {
  id: string
  data: TaskForm
}): Promise<void> => {
  if (!auth.currentUser) {
    throw new Error('User not logged in')
  }

  const docData = withModifiedMetadata(data)

  await setDoc(doc(db, TASKS_COLLECTION, id), docData, { merge: true })
}

/* API: Delete */
export const deleteTask = async ({ id }: { id: string }): Promise<void> => {
  if (!auth.currentUser) {
    throw new Error('User not logged in')
  }

  await deleteDoc(doc(db, TASKS_COLLECTION, id))
}
