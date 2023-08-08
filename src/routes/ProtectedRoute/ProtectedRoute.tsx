import { useAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'

type ProtectedRouteProps = {
  children: React.ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute
