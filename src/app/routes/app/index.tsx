import { AppLayout } from "@/components/layouts"
import { Button } from "@/components/ui/button"
import { ProtectedRoute } from "@/features/auth/components/protected-route"
import { logout } from "@/features/auth/hooks/useAuth"
import { Outlet, useNavigate } from "react-router-dom"

export const AppRoute = () => {
  const navigate = useNavigate()

  return (
    <ProtectedRoute>
      <AppLayout title="App">
        <div>INDIVIDUAL APP</div>
        <Button onClick={() => logout(() => navigate("/auth/login"))}>
          Logout
        </Button>
        <Outlet />
      </AppLayout>
    </ProtectedRoute>
  )
}
