import { TaskAppLayout } from '@/components/layouts'
import { Outlet } from 'react-router-dom'
import { Navigate, useLocation } from 'react-router-dom'

export const TaskRoute = () => {
  const location = useLocation()

  if (['/app/tasks', '/app/tasks/'].includes(location.pathname)) {
    return <Navigate to="today" />
  }

  return (
    <TaskAppLayout title="App">
      <Outlet />
    </TaskAppLayout>
  )
}
