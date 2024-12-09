import { AppListLayout } from '@/components/layouts/app-list-layout'
import { Button } from '@/components/ui/button'
import { ProtectedRoute } from '@/features/auth/components/protected-route'
import { logout } from '@/hooks/use-auth'
import { useNavigate } from 'react-router-dom'

export const AppListRoute = () => {
  const navigate = useNavigate()

  const handleLogout = () => logout(() => navigate('/auth/login'))

  return (
    <ProtectedRoute>
      <AppListLayout>
        <div>ALL APPS</div>
        <Button onClick={handleLogout}>Logout</Button>
      </AppListLayout>
    </ProtectedRoute>
  )
}
