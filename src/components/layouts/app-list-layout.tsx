import { ReactNode } from 'react'

type AppListLayout = {
  children: ReactNode
}

export const AppListLayout = ({ children }: AppListLayout) => {
  return <div>{children}</div>
}
