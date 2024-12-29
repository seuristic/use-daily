import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAuthStore } from '@/stores/use-auth-store'
import { PageLoader } from '@/components/loaders/page-loader'

type ProtectedRouteProps = {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuthStore()
  const location = useLocation()

  if (loading) return <PageLoader />

  const path = `/auth/login?redirectTo=${encodeURIComponent(location.pathname)}`

  if (!user) return <Navigate to={path} replace />

  return children
}
