import { Head } from '../ui/seo'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { PageLoader } from '../loaders/page-loader'

type LayoutProps = {
  children: React.ReactNode
  title: string
  description?: string
}

export const AuthLayout = ({ children, title, description }: LayoutProps) => {
  const { user, loading } = useAuth()

  if (loading) return <PageLoader />

  if (user) return <Navigate to="/app" replace />

  return (
    <>
      <Head title={title} description={description} />
      <div className="flex min-h-screen items-center justify-center bg-background">
        {children}
      </div>
    </>
  )
}
