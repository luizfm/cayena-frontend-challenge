import { renderHook } from '@testing-library/react'
import usePageDetails from './usePageDetails'
import { createWrapper } from '@/tests/wrapper'
import { useLocation } from 'react-router-dom'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}))

describe('usePageDetails | hook | integration test', () => {
  it('should return pageTitle information', () => {
    ;(useLocation as jest.Mock).mockReturnValue({
      pathname: '/suppliers',

      search: '',

      hash: '',
      state: {},
      key: '',
    })
    const { result } = renderHook(() => usePageDetails(), {
      wrapper: createWrapper({}),
    })

    expect(result.current.pageTitle).toBe('Suppliers')
  })
})
