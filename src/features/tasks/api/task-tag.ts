import { auth, db } from '@/configs/firebase'
import { withMetadata } from '@/lib/utils'
import { TaskTag } from '@/types/api'
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
import { z } from 'zod'
import { withModifiedMetadata } from '@/lib/utils'

export const TASK_TAGS_COLLECTION = 'task_tags'

export const TaskTagSchema = z.object({
  name: z.string().nonempty({
    message: "Tag name can't be empty"
  })
})

export type TaskTagForm = z.infer<typeof TaskTagSchema>

/* API: Get */
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

/* API: Create */
export const createTaskTag = async ({
  data
}: {
  data: TaskTagForm
}): Promise<TaskTag> => {
  if (!auth.currentUser) {
    throw new Error('User not logged in')
  }

  const docData = withMetadata(auth.currentUser, data)

  const docRef = await addDoc(collection(db, TASK_TAGS_COLLECTION), docData)
  const docId = docRef.id

  await setDoc(docRef, { id: docId }, { merge: true })

  return { ...docData, id: docId }
}

/* API: Edit */
export const editTaskTag = async ({
  id,
  data
}: {
  id: string
  data: TaskTagForm
}): Promise<void> => {
  if (!auth.currentUser) {
    throw new Error('User not logged in')
  }

  const docData = withModifiedMetadata(data)

  await setDoc(doc(db, TASK_TAGS_COLLECTION, id), docData, { merge: true })
}

/* API: Delete */
export const deleteTaskTag = async ({ id }: { id: string }): Promise<void> => {
  if (!auth.currentUser) {
    throw new Error('User not logged in')
  }

  await deleteDoc(doc(db, TASK_TAGS_COLLECTION, id))
}
