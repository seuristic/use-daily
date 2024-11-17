import { ProtectedRoute } from "@/features/auth/components/protected-route"

export const DashboardRoute = () => {
  return (
    <ProtectedRoute>
      <div>MAIN DASHBOARD</div>
    </ProtectedRoute>
  )
}
