import { renderHook, waitFor } from '@testing-library/react'
import { createWrapper } from '@/tests/wrapper'
import { api } from '@/api/fetcher'
import axios from 'axios'
import useGetSuppliers from './useGetSuppliers'

jest.mock('@/api/fetcher', () => {
  const originalModule = jest.requireActual('@/api/fetcher')

  return {
    ...jest.requireActual('@/api/fetcher'),
    api: {
      ...originalModule.api,
      get: jest.fn(() => axios.get),
    },
  }
})

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => {},
}))

const mockedSuppliers = [
  {
    publicId: '123',
    name: 'Supplier 1',
    cnpj: '22.222.333/3333-33',
    phoneNumber: '5511999999999',
    ownerName: 'John Doe',
  },
  {
    publicId: '321',
    name: 'Supplier 2',
    cnpj: '22.222.333/3333-44',
    phoneNumber: '5567999999999',
    ownerName: 'John Doe',
  },
]

describe('useGetSuppliers | hook | integration test', () => {
  it('should provide data if fetch is succeed', async () => {
    ;(api.get as jest.Mock).mockReturnValueOnce({ data: mockedSuppliers })
    const { result } = renderHook(() => useGetSuppliers(), {
      wrapper: createWrapper({}),
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toEqual(mockedSuppliers)
  })
})
