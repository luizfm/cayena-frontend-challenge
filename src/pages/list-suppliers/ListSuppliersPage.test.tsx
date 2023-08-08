import { render, screen } from '@testing-library/react'
import ListSuppliersPage from './ListSuppliersPage'
import { createWrapper } from '@/tests/wrapper'
import useGetSuppliers from '@/hooks/useGetSuppliers'

jest.mock('@/hooks/useGetSuppliers', () => jest.fn())

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

describe('ListSuppliersPage | page | unit test', () => {
  it('should render table with supplier data', () => {
    ;(useGetSuppliers as jest.Mock).mockReturnValue({
      data: mockedSuppliers,
      isLoading: false,
    })

    render(<ListSuppliersPage />, {
      wrapper: createWrapper({}),
    })

    expect(screen.queryAllByText('John Doe')).toHaveLength(2)
    expect(screen.getByText('Supplier 1')).toBeVisible()
    expect(screen.getByText('Supplier 2')).toBeVisible()
  })

  it('should render spinner if fails to get data', () => {
    ;(useGetSuppliers as jest.Mock).mockReturnValue({
      data: mockedSuppliers,
      isLoading: false,
      isError: true,
    })

    render(<ListSuppliersPage />, {
      wrapper: createWrapper({}),
    })

    expect(screen.getByTestId('spinner')).toBeVisible()
  })

  it('should render spinner if it is loading data', () => {
    ;(useGetSuppliers as jest.Mock).mockReturnValue({
      data: mockedSuppliers,
      isLoading: true,
      isError: false,
    })

    render(<ListSuppliersPage />, {
      wrapper: createWrapper({}),
    })

    expect(screen.getByTestId('spinner')).toBeVisible()
  })
})
