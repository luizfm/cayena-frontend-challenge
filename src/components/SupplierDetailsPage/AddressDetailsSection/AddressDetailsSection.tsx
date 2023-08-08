import { Controller, useFormContext } from 'react-hook-form'

import { Input } from '@/components/Input'
import { FormData } from '@/pages/supplier-details/SupplierDetailsPage'
import { REQUIRED_FIELD } from '@/constants/form'
import { MaskedInput } from '@/components/MaskedInput'

import styles from './styles.module.scss'

function AddressDetailsSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FormData>()

  return (
    <section className={styles['c-address-details-section']}>
      <h2 className={styles['c-address-details-section__subtitle']}>Address</h2>

      <Input
        className={styles['c-address-details-section__input-address']}
        label="Address"
        placeholder="Avenida Ibirapuera"
        {...register('address', REQUIRED_FIELD)}
        error={errors.address?.message}
      />
      <Input
        className={styles['c-address-details-section__input-number']}
        label="Number"
        placeholder="144"
        {...register('number', REQUIRED_FIELD)}
        error={errors.number?.message}
      />
      <Input
        className={styles['c-address-details-section__input-complement']}
        label="Complement"
        placeholder="Cj 65"
        {...register('complement', REQUIRED_FIELD)}
        error={errors.complement?.message}
      />
      <Input
        className={styles['c-address-details-section__input-neighborhood']}
        label="Neighborhood"
        placeholder="Ibira"
        {...register('neighborhood', REQUIRED_FIELD)}
        error={errors.neighborhood?.message}
      />
      <Input
        className={styles['c-address-details-section__input-city']}
        label="City"
        placeholder="São Paulo"
        {...register('city', REQUIRED_FIELD)}
        error={errors.city?.message}
      />
      <Input
        className={styles['c-address-details-section__input-state']}
        label="State"
        placeholder="SP"
        {...register('state', REQUIRED_FIELD)}
        error={errors.state?.message}
      />
      <Controller
        control={control}
        name="zipCode"
        rules={REQUIRED_FIELD}
        render={({ field: { ref, ...restFields } }) => (
          <MaskedInput
            label="Zip Code"
            mask="99999-9999"
            {...restFields}
            error={errors.zipCode?.message}
            placeholder="88852-2000"
            className={styles['c-address-details-section__input-zip-code']}
          />
        )}
      />
    </section>
  )
}

export default AddressDetailsSection
