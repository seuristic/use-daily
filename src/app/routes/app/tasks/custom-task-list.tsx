import { useParams } from 'react-router-dom'

export const CustomTaskListRoute = () => {
  const { id } = useParams()
  console.log('id', id)
  return <div>CustomTaskListRoute: {id}</div>
}
