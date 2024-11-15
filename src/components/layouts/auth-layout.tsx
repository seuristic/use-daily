import React, { useEffect, useState } from "react"
import { Head } from "../ui/seo"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/lib/auth"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/configs/firebase"
import { LoaderCircleIcon } from "lucide-react"

type LayoutProps = {
  children: React.ReactNode
  title: string
}

export const AuthLayout = ({ children, title }: LayoutProps) => {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        navigate(`/app`)
      } else {
        setIsLoading(false)
      }
    })

    return () => unsubscribe()
  }, [navigate, setUser])

  return (
    <>
      <Head title={title} />
      <div className="flex min-h-screen items-center justify-center bg-background">
        {isLoading ? (
          <LoaderCircleIcon size={36} className="animate-spin" />
        ) : (
          children
        )}
      </div>
    </>
  )
}
