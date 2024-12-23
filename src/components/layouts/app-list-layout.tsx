import { ReactNode } from 'react'

type AppsLayoutProps = {
  children: ReactNode
}

export const AppsLayout = ({ children }: AppsLayoutProps) => {
  return <div>{children}</div>
}
