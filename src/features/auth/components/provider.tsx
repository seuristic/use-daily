import { auth } from "@/configs/firebase"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { onAuthStateChanged } from "firebase/auth"
import { ReactNode, useEffect } from "react"

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setUser } = useAuth()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user))
    return () => unsubscribe()
  }, [setUser])

  return children
}
