import { act, renderHook, waitFor } from '@testing-library/react'
import axios from 'axios'
import useUpdateSupplier from './useUpdateSupplier'
import { createWrapper } from '@/tests/wrapper'
import { api } from '@/api/fetcher'
import { toast } from 'react-toastify'

jest.mock('react-toastify', () => ({
  ...jest.mock('react-toastify'),
  toast: {
    success: jest.fn(),
  },
}))

jest.mock('@/api/fetcher', () => {
  const originalModule = jest.requireActual('@/api/fetcher')

  return {
    ...jest.requireActual('@/api/fetcher'),
    api: {
      ...originalModule.api,
      put: jest.fn(() => axios.put),
    },
  }
})

const mockedSupplierData = {
  publicId: '123',
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

describe('useUpdateSupplier | hook | integration test', () => {
  it('should be able to update supplier and call toast', async () => {
    ;(api.put as jest.Mock).mockReturnValue({ data: mockedSupplierData })
    const { result } = renderHook(() => useUpdateSupplier('123'), {
      wrapper: createWrapper({}),
    })

    const { mutate } = result.current

    act(() => {
      mutate(mockedSupplierData)
    })

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalled()
    })
  })
})
