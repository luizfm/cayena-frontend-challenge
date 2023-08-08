import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import SupplierDetailsPage from './SupplierDetailsPage'
import useGetSupplierById from '@/hooks/useGetSupplierById'
import { createWrapper } from '@/tests/wrapper'
import useUpdateSupplier from '@/hooks/useUpdateSupplier'

jest.mock('@/hooks/useGetSupplierById')
jest.mock('@/hooks/useUpdateSupplier')

const mockedMutation = jest.fn()

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

describe('SupplierDetailsPage | page | unit test', () => {
  beforeEach(() => {
    ;(useGetSupplierById as jest.Mock).mockReturnValue({
      data: mockedSupplierData,
      isLoading: false,
      isError: false,
    })
    ;(useUpdateSupplier as jest.Mock).mockReturnValue({
      mutate: mockedMutation,
    })
  })

  it('should render form with values on fetch data succeed', async () => {
    render(<SupplierDetailsPage />, {
      wrapper: createWrapper({}),
    })

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Distribuidora A')).toHaveValue(
        'Supplier 1',
      )
      expect(screen.getByPlaceholderText('22.222.333/3333-33')).toHaveValue(
        '11.222.333/4444-55',
      )
      expect(screen.getByPlaceholderText('55 (96) 8014-5614')).toHaveValue(
        '55 (11) 99999-9999',
      )
      expect(screen.getByPlaceholderText('Lady Gaga')).toHaveValue('John Doe')
      expect(screen.getByPlaceholderText('ladygaga@bol.com.br')).toHaveValue(
        'johndoe@gmail.com',
      )
      expect(screen.getByPlaceholderText('55 (96) 8014-5617')).toHaveValue(
        '55 (11) 99999-5050',
      )
      expect(screen.getByPlaceholderText('Avenida Ibirapuera')).toHaveValue(
        'Rua das Oliveiras',
      )
      expect(screen.getByPlaceholderText('144')).toHaveValue('123')
      expect(screen.getByPlaceholderText('Cj 65')).toHaveValue('Cj 123')
      expect(screen.getByPlaceholderText('Ibira')).toHaveValue('Bela Vista')
      expect(screen.getByPlaceholderText('São Paulo')).toHaveValue('Palhoça')
      expect(screen.getByPlaceholderText('SP')).toHaveValue('SC')
      expect(screen.getByPlaceholderText('88852-2000')).toHaveValue(
        '88110-1202',
      )
    })
  })

  it('should render spinner when data fetching is error', () => {
    ;(useGetSupplierById as jest.Mock).mockReturnValue({
      data: mockedSupplierData,
      isLoading: false,
      isError: true,
    })

    render(<SupplierDetailsPage />, {
      wrapper: createWrapper({}),
    })

    expect(screen.getByTestId('spinner')).toBeVisible()
    expect(screen.queryAllByPlaceholderText('Distribuidora A')).toHaveLength(0)
  })

  it('should render spinner when data fetching is loading', () => {
    ;(useGetSupplierById as jest.Mock).mockReturnValue({
      data: mockedSupplierData,
      isLoading: true,
      isError: false,
    })

    render(<SupplierDetailsPage />, {
      wrapper: createWrapper({}),
    })

    expect(screen.getByTestId('spinner')).toBeVisible()
    expect(screen.queryAllByPlaceholderText('Distribuidora A')).toHaveLength(0)
  })

  it('should display required field if a field is empty after submit', async () => {
    render(<SupplierDetailsPage />, {
      wrapper: createWrapper({}),
    })

    const supplierNameInput = screen.getByPlaceholderText('Distribuidora A')
    const submitButton = screen.getByRole('button')

    act(() => {
      fireEvent.change(supplierNameInput, { target: { value: '' } })
      fireEvent.click(submitButton)
    })

    await waitFor(() => {
      expect(screen.getByText('This field is required!')).toBeVisible()
    })
  })

  it('should call mutation on submit', async () => {
    render(<SupplierDetailsPage />, {
      wrapper: createWrapper({}),
    })

    const submitButton = screen.getByRole('button')

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockedMutation).toHaveBeenCalledTimes(1)
    })
  })
})
