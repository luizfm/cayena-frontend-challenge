import { renderHook, waitFor } from '@testing-library/react'
import useGetSupplierById from './useGetSupplierById'
import { createWrapper } from '@/tests/wrapper'
import { api } from '@/api/fetcher'
import axios from 'axios'

jest.mock('@/api/fetcher', () => {
  const originalModule = jest.requireActual('@/api/fetcher')

  return {
    ...jest.requireActual('@/api/fetcher'),
    api: {
      ...originalModule.api,
      get: jest.fn(() => axios.get),
    },
    tokenApi: {
      ...originalModule.tokenApi,
      get: jest.fn(),
    },
  }
})

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => {},
}))

const mockedToastFunction = jest.fn()

jest.mock('react-toastify', () => ({
  toast: () => mockedToastFunction,
}))

const mockedSupplierData = {
  name: 'Supplier 1',
  cnpj: '11.222.333/4444-55',
  phoneNumber: '5511999999999',
  zipCode: '881101202',
  address: 'Rua das Oliveiras',
  number: '123',
  complement: 'Cj 123',
  neighborhood: 'Bela Vista',
  city: 'Palhoça',
  state: 'SC',
  ownerName: 'John Doe',
  ownerEmail: 'johndoe@gmail.com',
  ownerPhoneNumber: '5511999995050',
}

describe('useGetSupplierById | hook | integration test', () => {
  it('should provide data if fetch is succeed', async () => {
    ;(api.get as jest.Mock).mockReturnValueOnce({ data: mockedSupplierData })
    const { result } = renderHook(() => useGetSupplierById('123'), {
      wrapper: createWrapper({}),
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toEqual(mockedSupplierData)
  })

  it('should not call hook if supplier id is not provided', async () => {
    ;(api.get as jest.Mock).mockReturnValueOnce({ data: mockedSupplierData })
    const { result } = renderHook(() => useGetSupplierById(), {
      wrapper: createWrapper({}),
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toEqual(undefined)
  })
})
