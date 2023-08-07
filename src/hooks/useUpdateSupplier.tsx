import { useMutation, useQueryClient } from 'react-query'
import { api } from '../api/fetcher'
import { FormData } from '../pages/supplier-details/SupplierDetailsPage'
import { toast } from 'react-toastify'

function useUpdateSupplier(supplierId?: string) {
  const queryClient = useQueryClient()

  const updateSupplier = async (data: FormData) => {
    const updateResponse = await api.put(`/suppliers`, data)

    return updateResponse.data
  }

  return useMutation(['updateSupplier', supplierId], updateSupplier, {
    onSuccess: (data) => {
      queryClient.setQueryData(['supplier', supplierId], data)

      toast.success(`Supplier ${data.name} was successfully updated!`)
    },
    onError: (error, data) => {
      toast.error(`Error while updating the supplier ${data.name} - ${error}`)
    },
  })
}

export default useUpdateSupplier
