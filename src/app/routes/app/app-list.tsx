import { AppListLayout } from "@/components/layouts/app-list-layout"
import { ProtectedRoute } from "@/features/auth/components/protected-route"

export const AppListRoute = () => {
  return (
    <ProtectedRoute>
      <AppListLayout>
        <div>ALL APPS</div>
      </AppListLayout>
    </ProtectedRoute>
  )
}
