import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GoogleIcon } from "@/components/ui/icons"
import { login, useAuth } from "@/lib/auth"
import { LoaderIcon } from "lucide-react"
import { useState } from "react"

type LoginFormProps = {
  onSuccess: () => void
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { setUser } = useAuth()

  const handleLogin = async () => {
    setIsLoading(true)

    try {
      const response = await login(onSuccess)
      setUser(response.user)
    } catch (error: unknown) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl">Login</CardTitle>
        <CardDescription className="text-center">
          Sign in to your account using Google
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Button variant="outline" onClick={handleLogin} disabled={isLoading}>
          {isLoading ? (
            <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <GoogleIcon className="mr-2 h-4 w-4" />
          )}
          {isLoading ? "Signing In..." : "Sign in with Google"}
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <a
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </a>
          .
        </p>
      </CardFooter>
    </Card>
  )
}
