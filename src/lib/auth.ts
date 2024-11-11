import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "@/configs/firebase"
import { useState } from "react"

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const signInWithGoogle = async () => {
    setIsLoading(true)
    try {
      const response = await signInWithPopup(auth, provider)
      console.log(
        "Successfully authenticated with user details:",
        response.user,
      )
    } catch (e: unknown) {
      setError((e as Error).message as string)
    } finally {
      setIsLoading(false)
    }
  }

  return { user: "", isLoading, error, signInWithGoogle }
}
