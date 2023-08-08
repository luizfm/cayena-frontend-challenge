import { SuppliersTable } from '@/components/ListSuppliersPage/SuppliersTable'
import { Spinner } from '@/components/Spinner'
import useGetSuppliers from '@/hooks/useGetSuppliers'
import { mapSuppliers } from '@/utils/mapper-suppliers'

import styles from './styles.module.scss'

const TABLE_HEADERS = ['Name', 'CNPJ', 'Phone Number', 'Owner', 'Edit']

function ListSuppliersPage() {
  const { data, isLoading, isError } = useGetSuppliers()

  const suppliersRows = mapSuppliers(data)

  return (
    <div className={styles['c-list-suppliers-page']}>
      {(isLoading || isError) && <Spinner />}
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
