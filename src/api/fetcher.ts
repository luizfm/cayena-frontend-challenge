import axios from 'axios'
import { env } from '../env'
import { getRefreshToken, getToken } from '../utils/token'
import { User } from '../types/user'
import { Cookies } from 'react-cookie'

export const api = axios.create({
  baseURL: env.API_URL,
})

export const tokenApi = axios.create({
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

  const response = await tokenApi.post<User>('/oauth/token', formData)

  const user = response.data

  return user
}

api.interceptors.request.use((request) => {
  const token = getToken()

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

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = getRefreshToken()

      if (!refreshToken) {
        return Promise.reject(error)
      }

      try {
        const response = await getUpdatdTokens(refreshToken)

        const cookies = new Cookies()
        cookies.set('user', response, {
          path: '/',
        })

        return api(originalRequest)
      } catch (error) {
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  },
)

tokenApi.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error?.response.status === 401) {
      const cookies = new Cookies()

      await cookies.remove('user', {
        path: '/',
      })

      return Promise.reject(error)
    }

    return Promise.reject(error)
  },
)
