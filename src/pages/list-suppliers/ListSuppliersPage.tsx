import { SuppliersTable } from '@/src/components/ListSuppliersPage/SuppliersTable'
import { Spinner } from '@/src/components/Spinner'
import useGetSuppliers from '@/src/hooks/useGetSuppliers'
import { mapSuppliers } from '@/src/utils/mapper-suppliers'

import styles from './styles.module.scss'

const TABLE_HEADERS = ['Name', 'CNPJ', 'Phone Number', 'Owner', 'Edit']

function ListSuppliersPage() {
  const { data, isLoading } = useGetSuppliers()

  const suppliersRows = mapSuppliers(data)

  return (
    <div className={styles['c-list-suppliers-page']}>
      {isLoading && <Spinner />}
      {!isLoading && (
        <SuppliersTable
          tableHeaders={TABLE_HEADERS}
          tableRows={suppliersRows}
          className={styles['c-list-suppliers-page__table']}
        />
      )}
    </div>
  )
}

export default ListSuppliersPage
