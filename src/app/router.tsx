// import { useMemo } from "react"
// import { QueryClient, useQueryClient } from "react-query"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppRoute } from './routes/app'
import { ProtectedRoute } from '@/features/auth/components/protected-route'
import { AppsRoute } from './routes/app/apps'
import { DashboardRoute } from './routes/app/dashboard'
// import { AuthSkeleton } from "@/components/skeletons/auth"

const createAppRouter = () =>
  createBrowserRouter(
    [
      {
        path: '/',
        lazy: async () => {
          const { LandingRoute } = await import('./routes/landing')
          return { Component: LandingRoute }
        }
      },
      {
        path: '/auth/login',
        lazy: async () => {
          const { LoginRoute } = await import('./routes/auth/login')
          return { Component: LoginRoute }
        }
        // HydrateFallback: AuthSkeleton,
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <DashboardRoute />
          </ProtectedRoute>
        )
      },
      {
        path: '/app',
        element: (
          <ProtectedRoute>
            <AppRoute />
          </ProtectedRoute>
        ),
        children: [
          {
            path: 'tasks',
            lazy: async () => {
              const { TaskRoute } = await import('./routes/app/tasks')
              return { Component: TaskRoute }
            },
            children: [
              {
                path: 'today',
                lazy: async () => {
                  const { TodayTaskRoute } = await import(
                    './routes/app/tasks/today-task'
                  )
                  return { Component: TodayTaskRoute }
                }
              },
              {
                path: 'tomorrow',
                lazy: async () => {
                  const { TomorrowTaskRoute } = await import(
                    './routes/app/tasks/tomorrow-task'
                  )
                  return { Component: TomorrowTaskRoute }
                }
              },
              {
                path: 'pending',
                lazy: async () => {
                  const { PendingTaskRoute } = await import(
                    './routes/app/tasks/pending-task'
                  )
                  return { Component: PendingTaskRoute }
                }
              },
              {
                path: 'in-progress',
                lazy: async () => {
                  const { InProgressTaskRoute } = await import(
                    './routes/app/tasks/in-progress-task'
                  )
                  return { Component: InProgressTaskRoute }
                }
              },
              {
                path: 'completed',
                lazy: async () => {
                  const { CompletedTaskRoute } = await import(
                    './routes/app/tasks/completed-task'
                  )
                  return { Component: CompletedTaskRoute }
                }
              }
            ]
          },
          {
            path: 'notes',
            element: <div>NOTES APP</div>
          }
        ]
      },
      {
        path: '/apps',
        element: (
          <ProtectedRoute>
            <AppsRoute />
          </ProtectedRoute>
        )
      },
      {
        path: '*',
        lazy: async () => {
          const { NotFoundRoute } = await import('./routes/not-found')
          return { Component: NotFoundRoute }
        }
      }
    ],
    {
      future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true
      }
    }
  )

export const AppRouter = () => {
  // const queryClient = useQueryClient()
  // const router = useMemo(() => createAppRouter(queryClient), [queryClient])
  const router = createAppRouter()
  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true
      }}
    />
  )
}
