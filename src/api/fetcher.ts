import axios from 'axios'
import { env } from '../env'
import { getRefreshToken, getToken } from '../utils/token'
import { User } from '../types/user'
import { Cookies } from 'react-cookie'

export const api = axios.create({
  baseURL: env.API_URL,
})

export const getTokenApi = axios.create({
  baseURL: env.API_URL,
  auth: {
    username: env.CAYENA_USER_NAME,
    password: env.CAYENA_AUTH_TOKEN,
  },
})

const getUpdatdTokens = async (refreshToken: string) => {
  const formData = new FormData()

  formData.append('grant_type', 'refresh_token')
  formData.append('refresh_token', refreshToken)

  const response = await getTokenApi.post<User>('/oauth/token', formData)

  const user = response.data

  return user
}

api.interceptors.request.use((request) => {
  const token = getToken()
  console.log(token)

  if (token) {
    request.headers.Authorization = `Bearer ${token}`
  }

  return request
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error?.response?.status === 401) {
      const refreshToken = getRefreshToken()
      console.log({ refreshToken })

      if (!refreshToken) {
        return (window.location.href = '/login')
      }

      const response = await getUpdatdTokens(refreshToken)

      const cookies = new Cookies()
      cookies.set('user', response)

      return api(originalRequest)
    }

    return Promise.reject(error)
  },
)
