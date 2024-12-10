import { AppLayout } from '@/components/layouts'
import { ProtectedRoute } from '@/features/auth/components/protected-route'
import { Outlet } from 'react-router-dom'

export const AppRoute = () => {
  return (
    <ProtectedRoute>
      <AppLayout title="App">
        <Outlet />
      </AppLayout>
    </ProtectedRoute>
  )
}
