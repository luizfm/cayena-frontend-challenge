import { Controller, useFormContext } from 'react-hook-form'

import { Input } from '@/components/Input'
import { FormData } from '@/pages/supplier-details/SupplierDetailsPage'
import { REQUIRED_FIELD } from '@/constants/form'
import { MaskedInput } from '@/components/MaskedInput'

import styles from './styles.module.scss'

function OwnerDetailsSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FormData>()

  return (
    <section className={styles['c-owner-details-section']}>
      <h2 className={styles['c-owner-details-section__subtitle']}>Owner</h2>
      <Input
        label="Name"
        className={styles['c-owner-details-section__input-name']}
        placeholder="Lady Gaga"
        {...register('ownerName', REQUIRED_FIELD)}
        error={errors.ownerName?.message}
      />
      <Input
        label="Email"
        className={styles['c-owner-details-section__input-email']}
        placeholder="ladygaga@bol.com.br"
        type="email"
        {...register('ownerEmail', REQUIRED_FIELD)}
        error={errors.ownerEmail?.message}
      />
      <Controller
        control={control}
        name="ownerPhoneNumber"
        rules={REQUIRED_FIELD}
        render={({ field: { ref, ...restFields } }) => (
          <MaskedInput
            label="Phone Number"
            mask="99 (99) 99999-9999"
            {...restFields}
            error={errors.ownerPhoneNumber?.message}
            placeholder="55 (96) 8014-5617"
            className={styles['c-owner-details-section__input-phone-number']}
          />
        )}
      />
    </section>
  )
}

export default OwnerDetailsSection
