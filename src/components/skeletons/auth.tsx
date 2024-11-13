export const AuthSkeleton = () => {
  return (
    <div className="mx-auto max-w-md animate-pulse space-y-4 p-6">
      <div className="h-6 w-3/4 rounded bg-gray-300"></div>
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-gray-300"></div>
        <div className="h-4 w-5/6 rounded bg-gray-300"></div>
        <div className="h-4 w-4/5 rounded bg-gray-300"></div>
      </div>
      <div className="mt-4 h-10 w-1/2 rounded bg-gray-300"></div>
    </div>
  )
}
