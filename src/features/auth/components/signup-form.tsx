import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom"

type SignupFormProps = {
  onSuccess: () => void
}

export const SignupForm = ({ onSuccess }: SignupFormProps) => {
  return (
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
        <Button variant="outline" onClick={onSuccess}>
          Sign-in
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
            to="/auth/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
