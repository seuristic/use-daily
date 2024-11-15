import { AuthLayout } from "@/components/layouts/auth-layout"
import { SignupForm } from "@/features/auth/components/signup-form"
import { useNavigate, useSearchParams } from "react-router-dom"

export const SignupRoute = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get("redirectTo")

  return (
    <AuthLayout title={"Signup"}>
      <SignupForm
        onSuccess={() => navigate(`${redirectTo ? `${redirectTo}` : "/app"}`)}
      />
    </AuthLayout>
  )
}
