import { Head } from "../ui/seo"
import { Navigate, useSearchParams } from "react-router-dom"
import { useAuth } from "@/features/auth/hooks/useAuth"

type LayoutProps = {
  children: React.ReactNode
  title: string
  description?: string
}

export const AuthLayout = ({ children, title, description }: LayoutProps) => {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get("redirectTo")

  if (user) {
    return <Navigate to={`${redirectTo ? redirectTo : "/app"}`} />
  }

  return (
    <>
      <Head title={title} description={description} />
      <div className="flex min-h-screen items-center justify-center bg-background">
        {children}
      </div>
    </>
  )
}
