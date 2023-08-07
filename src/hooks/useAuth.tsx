import { useCookies } from 'react-cookie'
import { useQueryClient } from 'react-query'
import { User } from '../types/user'

export function useAuth() {
  const [cookies] = useCookies(['user'])
  const queryClient = useQueryClient()

  const user = cookies.user as User

  if (cookies.user) {
    queryClient.setQueryData(['user'], user)
  }

  return {
    user,
    token: user?.access_token,
  }
}
