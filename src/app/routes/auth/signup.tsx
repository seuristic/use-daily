import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { Link } from "react-router-dom"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "@/configs/firebase"

export const SignupRoute = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const signInWithGoogle = async () => {
    setIsLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      // success
    } catch (e: unknown) {
      setError((e as Error).message as string)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Sign up for your account using Google
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button
            variant="outline"
            onClick={signInWithGoogle}
            disabled={isLoading}
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.google className="mr-2 h-4 w-4" />
            )}
            {isLoading ? "Signing Up..." : "Sign up with Google"}
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              to="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline underline-offset-4 hover:text-primary"
            >
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
