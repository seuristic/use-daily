// import { useMemo } from "react"
// import { QueryClient, useQueryClient } from "react-query"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import { AuthSkeleton } from "@/components/skeletons/auth"

const createAppRouter = () =>
  createBrowserRouter(
    [
      {
        path: '/',
        lazy: async () => {
          const { LandingRoute } = await import('./routes/landing')
          return { Component: LandingRoute }
        },
      },
      {
        path: '/auth/login',
        lazy: async () => {
          const { LoginRoute } = await import('./routes/auth/login')
          return { Component: LoginRoute }
        },
        // HydrateFallback: AuthSkeleton,
      },
      {
        path: '/dashboard',
        lazy: async () => {
          const { DashboardRoute } = await import('./routes/app/dashboard')
          return { Component: DashboardRoute }
        },
      },
      {
        path: '/app',
        lazy: async () => {
          const { AppRoute } = await import('./routes/app')
          return { Component: () => AppRoute() }
        },
        children: [
          {
            path: 'tasks',
            element: <div>TASK APP</div>,
          },
          {
            path: 'notes',
            element: <div>NOTES APP</div>,
          },
        ],
      },
      {
        path: '/apps',
        lazy: async () => {
          const { AppListRoute } = await import('./routes/app/app-list')
          return { Component: AppListRoute }
        },
      },
      {
        path: '*',
        lazy: async () => {
          const { NotFoundRoute } = await import('./routes/not-found')
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
