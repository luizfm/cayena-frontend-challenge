import { renderHook } from '@testing-library/react'
import { useCookies } from 'react-cookie'
import { useAuth } from './useAuth'
import { createWrapper } from '@/tests/wrapper'

jest.mock('react-cookie', () => ({
  useCookies: jest.fn(),
}))

describe('useAuth | hook | unit test', () => {
  it('should provide user and token', () => {
    ;(useCookies as jest.Mock).mockReturnValue([
      {
        user: {
          name: 'john doe',
          access_token: '1234',
        },
      },
    ])

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper({}),
    })

    expect(result.current).toEqual({
      user: {
        name: 'john doe',
        access_token: '1234',
      },
      token: '1234',
    })
  })
})
