import { render, screen } from '@testing-library/react'
import SuppliersTable from './SuppliersTable'
import { createWrapper } from '@/tests/wrapper'

describe('Suppliers Table | page | unit test', () => {
  it('should render component table headers and cells', () => {
    render(
      <SuppliersTable
        tableHeaders={['Id', 'Name']}
        tableRows={[{ id: '1', rowCells: ['123', 'Luiz'] }]}
      />,
      {
        wrapper: createWrapper({}),
      },
    )

    expect(screen.getByText('Id')).toBeInTheDocument()
    expect(screen.getByText('Luiz')).toBeVisible()
  })
})
