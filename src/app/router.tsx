// import { useMemo } from "react"
// import { QueryClient, useQueryClient } from "react-query"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const createAppRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      lazy: async () => {
        const { LandingRoute } = await import("./routes/landing")
        return { Component: LandingRoute }
      },
    },
    {
      path: "/login",
      lazy: async () => {
        const { LoginRoute } = await import("./routes/auth/login")
        return { Component: LoginRoute }
      },
    },
    {
      path: "/signup",
      lazy: async () => {
        const { SignupRoute } = await import("./routes/auth/signup")
        return { Component: SignupRoute }
      },
    },
    {
      path: "*",
      lazy: async () => {
        const { NotFoundRoute } = await import("./routes/not-found")
        return { Component: NotFoundRoute }
      },
    },
  ])

export const AppRouter = () => {
  // const queryClient = useQueryClient()
  // const router = useMemo(() => createAppRouter(queryClient), [queryClient])
  const router = createAppRouter()
  return <RouterProvider router={router} />
}
