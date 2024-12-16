import { LoaderCircleIcon } from 'lucide-react'

export const PageLoader = () => {
  return (
    <div className="grid h-svh place-items-center">
      <LoaderCircleIcon size={36} className="animate-spin" />
    </div>
  )
}
