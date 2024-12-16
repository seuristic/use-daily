import { AppListLayout } from '@/components/layouts/app-list-layout'
import { Button } from '@/components/ui/button'
import { ProtectedRoute } from '@/features/auth/components/protected-route'
import { logout } from '@/hooks/use-auth'

export const AppListRoute = () => {
  return (
    <ProtectedRoute>
      <AppListLayout>
        <div>ALL APPS</div>
        <Button onClick={logout}>Logout</Button>
      </AppListLayout>
    </ProtectedRoute>
  )
}
