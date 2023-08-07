import { Button } from '@/src/components/Button'

import styles from './styles.module.scss'
import classNames from 'classnames'

type TableRowsType = {
  id: string
  rowCells: React.ReactNode[]
}

type SuppliersTableProps = {
  tableHeaders: string[]
  tableRows: TableRowsType[]
  className?: string
}

function SuppliersTable({
  tableHeaders,
  tableRows,
  className,
}: SuppliersTableProps) {
  return (
    <table className={classNames(styles['c-suppliers-table'], className)}>
      <thead>
        <tr>
          {tableHeaders.map((header) => (
            <th
              key={header}
              className={styles['c-suppliers-table__table-header-cell']}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableRows.map((row, index) => (
          <tr
            key={row.id}
            className={classNames(styles['c-suppliers-table__table-row'], {
              [styles['c-suppliers-table__table-row--even']]: index % 2 === 0,
            })}
          >
            {row.rowCells.map((cell, index) => (
              <td
                key={`${row.id}-cell-${index}`}
                className={styles['c-suppliers-table__table-cell']}
              >
                {cell}
              </td>
            ))}
            <td className={styles['c-suppliers-table__table-cell']}>
              <Button
                to={`/suppliers/${row.id}`}
                className={styles['c-suppliers-table__edit-button']}
                variant="secondary"
              >
                Edit
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SuppliersTable
