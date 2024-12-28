import { auth, db } from '@/configs/firebase'
import { TaskTag } from '@/types/api'
import { addDoc, collection, setDoc, Timestamp } from 'firebase/firestore'
import { z } from 'zod'

export const TASK_TAGS_COLLECTION = 'task_tags'

export const CreateTaskTagSchema = z.object({
  name: z.string().nonempty({
    message: "Tag name can't be empty"
  })
})

export type CreateTaskTagForm = z.infer<typeof CreateTaskTagSchema>

export const createTaskTag = async ({
  data
}: {
  data: CreateTaskTagForm
}): Promise<TaskTag> => {
  if (!auth.currentUser) {
    throw new Error('User not logged in')
  }

  const docData = {
    ...data,
    created_at: Timestamp.now().toDate().toISOString(),
    created_ts: Timestamp.now().seconds,
    uid: auth.currentUser.uid
  }

  const docRef = await addDoc(collection(db, TASK_TAGS_COLLECTION), docData)
  const docId = docRef.id

  await setDoc(docRef, { id: docId }, { merge: true })

  return { ...docData, id: docId }
}