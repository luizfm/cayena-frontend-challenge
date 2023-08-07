import { useQuery } from 'react-query'
import { api } from '../api/fetcher'
import { Suppliers } from '../types/suppliers'

function useGetSuppliers() {
  const getSuppliers = async () => {
    try {
      const suppliers = await api.get<Suppliers[]>('/suppliers')

      return suppliers.data
    } catch (error) {
      console.log(error)
      return []
    }
  }

  return useQuery<Suppliers[]>(['suppliers'], getSuppliers)
}

export default useGetSuppliers
