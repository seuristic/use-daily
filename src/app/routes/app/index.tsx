import { AppLayout } from '@/components/layouts'
import { Outlet } from 'react-router-dom'
import { Navigate, useLocation } from 'react-router-dom'

export const AppRoute = () => {
  const location = useLocation()

  if (['/app', '/app/'].includes(location.pathname)) {
    return <Navigate to="tasks" />
  }

  return (
    <AppLayout title="App">
      <Outlet />
    </AppLayout>
  )
}
