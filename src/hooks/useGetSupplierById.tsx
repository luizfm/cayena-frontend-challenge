import { useQuery, useQueryClient } from 'react-query'
import { api } from '../api/fetcher'
import { Supplier } from '../types/suppliers'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function useGetSupplierById(supplierId?: string) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const getSupplierById = async () => {
    const supplier = await api.get(`/suppliers/${supplierId}`)

    return supplier.data
  }

  return useQuery<Supplier>(['supplier', supplierId], getSupplierById, {
    enabled: Boolean(supplierId),
    onError: () => {
      toast.error(
        'Something went wrong while authenticating. Please, login again',
      )
      queryClient.clear()
      navigate('/login')
    },
  })
}

export default useGetSupplierById
