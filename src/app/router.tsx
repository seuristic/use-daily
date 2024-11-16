// import { useMemo } from "react"
// import { QueryClient, useQueryClient } from "react-query"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
// import { AuthSkeleton } from "@/components/skeletons/auth"
import { AppRoute } from "./routes/app"
import { ProtectedRoute } from "@/features/auth/components/protected-route"
import { DashboardRoute } from "./routes/app/dashboard"

const createAppRouter = () =>
  createBrowserRouter(
    [
      {
        path: "/",
        lazy: async () => {
          const { LandingRoute } = await import("./routes/landing")
          return { Component: LandingRoute }
        },
      },
      {
        path: "/auth/login",
        lazy: async () => {
          const { LoginRoute } = await import("./routes/auth/login")
          return { Component: LoginRoute }
        },
        // HydrateFallback: AuthSkeleton,
      },
      {
        path: "/auth/signup",
        lazy: async () => {
          const { SignupRoute } = await import("./routes/auth/signup")
          return { Component: SignupRoute }
        },
        // HydrateFallback: AuthSkeleton,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <DashboardRoute />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app",
        element: (
          <ProtectedRoute>
            <AppRoute />
          </ProtectedRoute>
        ),
        // children: [
        //   {
        //     path: 'task',
        //     lazy:
        //   }
        // ]
      },
      {
        path: "*",
        lazy: async () => {
          const { NotFoundRoute } = await import("./routes/not-found")
          return { Component: NotFoundRoute }
        },
      },
    ],
    {
      future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      },
    },
  )

export const AppRouter = () => {
  // const queryClient = useQueryClient()
  // const router = useMemo(() => createAppRouter(queryClient), [queryClient])
  const router = createAppRouter()
  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  )
}
