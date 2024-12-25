import { TaskDialog } from '@/features/tasks/components/task-dialog'
import { useParams } from 'react-router-dom'

export const CustomTaskListRoute = () => {
  const { id } = useParams()

  return (
    <div>
      CustomTaskListRoute: {id}
      <TaskDialog />
    </div>
  )
}
