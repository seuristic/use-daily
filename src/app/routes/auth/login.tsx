/* eslint-disable @typescript-eslint/no-unused-vars */

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
import { useState } from "react"
import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "@/configs/firebase"

export function LoginRoute() {
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
  if (error) {
    return (
      <div className="text-destructive-foreground">
        Error occurred in authentication setup with Google
      </div>
    )
  }

  if (isLoading) {
    return <div className="">Loader</div>
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl">Login</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account using Google
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
    </div>
  )
}
