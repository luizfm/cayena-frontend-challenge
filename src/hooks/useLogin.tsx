import { useMutation, useQueryClient } from 'react-query'
import { getTokenApi } from '../api/fetcher'
import { useCookies } from 'react-cookie'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

type ErrorDataType = {
  error: string
  error_description: string
}

export function useLogin() {
  const navigate = useNavigate()
  const [, setCookie] = useCookies(['user'])
  const queryClient = useQueryClient()
  const loginFunction = async (formData: FormData) => {
    const result = await getTokenApi.post('/oauth/token', formData)
    return result.data
  }

  return useMutation(['login'], loginFunction, {
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data)
      setCookie('user', data, {
        maxAge: data.expires_in,
      })

      navigate('/suppliers')
    },
    onError: (result: AxiosError<ErrorDataType>) => {
      const errorInfo = result.response?.data
      const message = errorInfo?.error_description

      toast.error(message)
    },
  })
}
