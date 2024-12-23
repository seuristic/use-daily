import { ReactNode } from 'react'

import { Head } from '../ui/seo'

type TaskAppLayoutProps = {
  children: ReactNode
  title?: string
}

export const TaskAppLayout = ({ children, title }: TaskAppLayoutProps) => {
  return (
    <>
      <Head title={title} />
      <div className="p-2">{children}</div>
    </>
  )
}
