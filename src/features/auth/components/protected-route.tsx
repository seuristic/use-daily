import { useAuth } from "@/features/auth/hooks/useAuth"
import { LoaderCircleIcon } from "lucide-react"
import { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"

type ProtectedRouteProps = {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation()

  const { user } = useAuth()

  if (typeof user === "undefined") {
    return (
      <div className="grid h-svh place-items-center">
        <LoaderCircleIcon size={36} className="animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <Navigate
        to={`/auth/login?redirectTo=${encodeURIComponent(location.pathname)}`}
        replace
      />
    )
  }

  return children
}
