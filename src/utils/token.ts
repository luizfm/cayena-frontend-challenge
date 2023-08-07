import { Cookies } from 'react-cookie'

export function getToken() {
  const cookies = new Cookies()
  const user = cookies.get('user')

  return user?.access_token
}

export function getRefreshToken() {
  const cookies = new Cookies()
  const user = cookies.get('user')

  return user?.refresh_token
}
