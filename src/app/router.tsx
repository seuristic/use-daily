import { useMemo } from "react"
import { QueryClient, useQueryClient } from "react-query"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: "/",
      lazy: async () => {
        const { LandingRoute } = await import("./routes/landing")
        return { Component: LandingRoute }
      },
    },
  ])

export const AppRouter = () => {
  const queryClient = useQueryClient()
  const router = useMemo(() => createAppRouter(queryClient), [queryClient])
  return <RouterProvider router={router} />
}
