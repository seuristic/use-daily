import { LoaderIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { GoogleIcon } from '@/components/ui/icons'
import { login } from '../api/auth'

type LoginFormProps = {
  callback: () => void
}

export const LoginForm = ({ callback }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleLogin = async () => {
    setIsLoading(true)

    try {
      await login()
      if (callback) callback()
    } catch (e) {
      console.error('Error in handleLogin', e)
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
          {isLoading ? 'Signing In...' : 'Sign in with Google'}
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{' '}
          <a
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </a>{' '}
          and{' '}
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
