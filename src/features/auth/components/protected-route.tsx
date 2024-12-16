import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAuth } from '@/hooks/use-auth'
import { PageLoader } from '@/components/loaders/page-loader'

type ProtectedRouteProps = {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <PageLoader />

  const path = `/auth/login?redirectTo=${encodeURIComponent(location.pathname)}`

  if (!user) return <Navigate to={path} replace />

  return children
}
