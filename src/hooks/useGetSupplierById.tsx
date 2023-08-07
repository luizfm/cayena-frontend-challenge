import { useQuery } from 'react-query'
import { api } from '../api/fetcher'
import { Supplier } from '../types/suppliers'

function useGetSupplierById(supplierId?: string) {
  const getSupplierById = async () => {
    const supplier = await api.get(`/suppliers/${supplierId}`)

    return supplier.data
  }

  return useQuery<Supplier>(['supplier', supplierId], getSupplierById, {
    enabled: Boolean(supplierId),
  })
}

export default useGetSupplierById
