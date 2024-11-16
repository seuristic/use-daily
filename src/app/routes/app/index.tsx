import { Button } from "@/components/ui/button"
import { Head } from "@/components/ui/seo"
import { logout } from "@/features/auth/hooks/useAuth"
import { useNavigate } from "react-router-dom"

export const AppRoute = () => {
  const navigate = useNavigate()

  return (
    <>
      <Head title="App" />
      <div>INDIVIDUAL APP</div>
      <Button onClick={() => logout(() => navigate("/auth/login"))}>
        Logout
      </Button>
    </>
  )
}
