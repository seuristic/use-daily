import { signInWithPopup, signOut, User } from "firebase/auth"
import { auth, provider } from "@/configs/firebase"
import { create } from "zustand"

type AuthType = {
  user: User | null | undefined
  setUser: (user: User | null) => void
}

export const useAuth = create<AuthType>()((set) => ({
  user: undefined,
  setUser: (user) => set(() => ({ user })),
}))

export const login = async (callback?: () => void) => {
  try {
    const response = await signInWithPopup(auth, provider)
    console.log("Login successfully", response)
    if (callback) callback()
    return response
  } catch (e) {
    console.error(e)
    throw new Error("Something went wrong while authenticating with Google")
  }
}

export const logout = async (callback?: () => void) => {
  try {
    await signOut(auth)
    console.log("Logout successfully")
    if (callback) callback()
  } catch (e) {
    console.error(e)
    throw new Error("Error: unable to logout")
  }
}
