import { act, renderHook, waitFor } from '@testing-library/react'
import { createWrapper } from '@/tests/wrapper'
import { tokenApi } from '@/api/fetcher'
import axios from 'axios'
import { useLogin } from './useLogin'

jest.mock('@/api/fetcher', () => {
  const originalModule = jest.requireActual('@/api/fetcher')

  return {
    ...jest.requireActual('@/api/fetcher'),
    tokenApi: {
      ...originalModule.tokenApi,
      post: jest.fn(() => axios.post),
    },
  }
})

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}))

const mockedSetCookie = jest.fn()

jest.mock('react-cookie', () => ({
  useCookies: () => [jest.fn(), mockedSetCookie],
}))

const mockedUser = {
  access_token: '123',
  token_type: 'token',
  refresh_token: '321',
  expires_in: 256,
  scope: 'web',
  jti: 'jho-ndoe',
}

describe('useGetSupplierById | hook | integration test', () => {
  it('should provide data if fetch is succeed', async () => {
    ;(tokenApi.post as jest.Mock).mockReturnValueOnce({ data: mockedUser })
    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper({}),
    })

    const { mutate } = result.current

    const form = new FormData()

    form.append('grant_type', 'password')
    form.append('scope', 'web')
    form.append('username', 'john')
    form.append('password', 'doe')

    act(() => {
      mutate(form)
    })

    await waitFor(() => {
      expect(mockedSetCookie).toHaveBeenCalledTimes(1)
    })
  })
})
