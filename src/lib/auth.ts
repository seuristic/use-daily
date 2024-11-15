import { signInWithPopup, User } from "firebase/auth"
import { auth, provider } from "@/configs/firebase"
import { create } from "zustand"

type AuthType = {
  user: User | null
  setUser: (user: User | null) => void
}

export const useAuth = create<AuthType>()((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}))

export const login = async (onSuccess?: () => void) => {
  try {
    const response = await signInWithPopup(auth, provider)
    if (onSuccess) onSuccess()
    return response
  } catch (e) {
    console.error(e)
    throw new Error("Something went wrong while authenticating with Google")
  }
}
