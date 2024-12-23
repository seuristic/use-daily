import { AppsLayout } from '@/components/layouts/app-list-layout'
import { Button } from '@/components/ui/button'
import { logout } from '@/hooks/use-auth'

export const AppsRoute = () => {
  return (
    <AppsLayout>
      <div>ALL APPS</div>
      <Button onClick={logout}>Logout</Button>
    </AppsLayout>
  )
}
