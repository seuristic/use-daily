import { AppLayout } from "@/components/layouts"
import { Button } from "@/components/ui/button"
import { ProtectedRoute } from "@/features/auth/components/protected-route"
import { logout } from "@/hooks/use-auth"
import { Outlet, useNavigate } from "react-router-dom"

export const AppRoute = () => {
  const navigate = useNavigate()

  const handleLogout = () => logout(() => navigate("/auth/login"))

  return (
    <ProtectedRoute>
      <AppLayout title="App">
        <div>INDIVIDUAL APP</div>
        <Button onClick={handleLogout}>Logout</Button>
        <Outlet />
      </AppLayout>
    </ProtectedRoute>
  )
}
