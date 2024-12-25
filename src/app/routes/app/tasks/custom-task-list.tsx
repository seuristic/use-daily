import { useParams } from 'react-router-dom'

export const CustomTaskListRoute = () => {
  const { id } = useParams()

  return <div>CustomTaskListRoute: {id}</div>
}
