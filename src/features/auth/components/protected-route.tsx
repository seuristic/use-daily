import { auth } from "@/configs/firebase"
import { useAuth } from "@/lib/auth"
import { onAuthStateChanged } from "firebase/auth"
import { LoaderCircleIcon } from "lucide-react"
import { ReactNode, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

type ProtectedRouteProps = {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation()
  const navigate = useNavigate()

  const { user, setUser } = useAuth()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        navigate(
          `/auth/login?redirectTo=${encodeURIComponent(location.pathname)}`,
        )
      }
    })

    return () => unsubscribe()
  }, [location.pathname, navigate, setUser])

  if (!user) {
    return (
      <div className="flex h-svh w-full">
        <LoaderCircleIcon size={36} className="m-auto animate-spin" />
      </div>
    )
  }

  return children
}
