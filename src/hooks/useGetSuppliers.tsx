import { useQuery, useQueryClient } from 'react-query'
import { api } from '../api/fetcher'
import { Suppliers } from '../types/suppliers'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function useGetSuppliers() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const getSuppliers = async () => {
    const suppliers = await api.get<Suppliers[]>('/suppliers')

    return suppliers.data
  }

  return useQuery<Suppliers[]>(['suppliers'], getSuppliers, {
    onError: () => {
      toast.error(
        'Something went wrong while authenticating. Please, log in again',
      )
      queryClient.clear()
      navigate('/login')
    },
  })
}

export default useGetSuppliers
