import { Controller, useFormContext } from 'react-hook-form'

import { Input } from '@/src/components/Input'
import { FormData } from '@/src/pages/supplier-details/SupplierDetailsPage'
import { REQUIRED_FIELD } from '@/src/constants/form'
import { MaskedInput } from '@/src/components/MaskedInput'

import styles from './styles.module.scss'

function AddressDetailsSection() {
  const { register, control } = useFormContext<FormData>()

  return (
    <section className={styles['c-address-details-section']}>
      <h2 className={styles['c-address-details-section__subtitle']}>Address</h2>

      <Input
        className={styles['c-address-details-section__input-address']}
        label="Address"
        placeholder="Avenida Ibirapuera"
        {...register('address', REQUIRED_FIELD)}
      />
      <Input
        className={styles['c-address-details-section__input-number']}
        label="Number"
        placeholder="144"
        type="number"
        {...register('number', REQUIRED_FIELD)}
      />
      <Input
        className={styles['c-address-details-section__input-complement']}
        label="Complement"
        placeholder="Cj 65"
        {...register('complement', REQUIRED_FIELD)}
      />
      <Input
        className={styles['c-address-details-section__input-neighborhood']}
        label="Neighborhood"
        placeholder="Ibira"
        {...register('neighborhood', REQUIRED_FIELD)}
      />
      <Input
        className={styles['c-address-details-section__input-city']}
        label="City"
        placeholder="São Paulo"
        {...register('city', REQUIRED_FIELD)}
      />
      <Input
        className={styles['c-address-details-section__input-state']}
        label="State"
        placeholder="SP"
        {...register('state', REQUIRED_FIELD)}
      />
      <Controller
        control={control}
        name="zipCode"
        render={({ field }) => (
          <MaskedInput
            label="Zip Code"
            mask="99999-9999"
            {...field}
            placeholder="88852-2000"
            className={styles['c-address-details-section__input-zip-code']}
          />
        )}
      />
    </section>
  )
}

export default AddressDetailsSection
