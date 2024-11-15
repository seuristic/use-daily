import { AuthLayout } from "@/components/layouts/auth-layout"
import { LoginForm } from "@/features/auth/components/login-form"
import { useNavigate, useSearchParams } from "react-router-dom"

export const LoginRoute = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get("redirectTo")

  return (
    <AuthLayout title={"Login"}>
      <LoginForm
        onSuccess={() => navigate(`${redirectTo ? `${redirectTo}` : "/app"}`)}
      />
    </AuthLayout>
  )
}
