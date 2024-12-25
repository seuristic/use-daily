import { TaskDialog } from '@/features/tasks/components/task-dialog'
import React from 'react'

export const TodayTaskRoute: React.FC = () => {
  return (
    <div>
      Today's Task
      <TaskDialog />
    </div>
  )
}
