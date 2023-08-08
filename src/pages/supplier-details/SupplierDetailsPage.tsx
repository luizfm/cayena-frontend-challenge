import { FormProvider, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import useGetSupplierById from '@/hooks/useGetSupplierById'
import { SupplierDetailsSection } from '@/components/SupplierDetailsPage/SupplierDetailsSection'
import { OwnerDetailsSection } from '@/components/SupplierDetailsPage/OwnerDetailsSection'
import { AddressDetailsSection } from '@/components/SupplierDetailsPage/AddressDetailsSection'
import { Spinner } from '@/components/Spinner'
import { Button } from '@/components/Button'
import useUpdateSupplier from '@/hooks/useUpdateSupplier'

import styles from './styles.module.scss'

export type FormData = {
  publicId?: string
  name: string
  cnpj: string
  phoneNumber: string
  zipCode: string
  address: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  ownerName: string
  ownerEmail: string
  ownerPhoneNumber: string
}

function SupplierDetailsPage() {
  const { supplierId } = useParams()
  const { data, isLoading, isError } = useGetSupplierById(supplierId)
  const { mutate } = useUpdateSupplier(supplierId)

  const methods = useForm<FormData>({
    defaultValues: {
      publicId: '',
      name: '',
      cnpj: '',
      phoneNumber: '',
      zipCode: '',
      address: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      ownerName: '',
      ownerEmail: '',
      ownerPhoneNumber: '',
    },
  })

  const { reset, handleSubmit } = methods

  const onSubmit = handleSubmit((formData) => {
    mutate({
      publicId: supplierId,
      ...formData,
    })
  })

  useEffect(() => {
    reset({ ...data })
  }, [data, reset])

  return (
    <div className={styles['c-supplier-details-page']}>
      {isLoading || isError ? (
        <div className={styles['c-supplier-details-page__loading-wrapper']}>
          <Spinner />
        </div>
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <SupplierDetailsSection />
            <OwnerDetailsSection />
            <AddressDetailsSection />
            <Button
              variant="secondary"
              type="submit"
              className={styles['c-supplier-details-page__submit-button']}
              title="update supplier"
            >
              Submit
            </Button>
          </form>
        </FormProvider>
      )}
    </div>
  )
}

export default SupplierDetailsPage
