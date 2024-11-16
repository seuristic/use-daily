"use client"

import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ErrorBoundary } from "react-error-boundary"
import { HelmetProvider } from "react-helmet-async"

import { MainErrorFallback } from "@/components/error/main"
import { queryConfig } from "@/lib/query"
import { ThemeProvider } from "@/components/theme"
import { AuthProvider } from "@/features/auth/components/provider"

type AppProviderProps = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      }),
  )

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider>
        <ErrorBoundary FallbackComponent={MainErrorFallback}>
          <HelmetProvider>
            <AuthProvider>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </AuthProvider>
          </HelmetProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </React.Suspense>
  )
}
