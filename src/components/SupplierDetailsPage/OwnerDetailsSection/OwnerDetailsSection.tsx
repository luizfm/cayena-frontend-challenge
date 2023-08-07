import { Controller, useFormContext } from 'react-hook-form'

import { Input } from '@/src/components/Input'
import { FormData } from '@/src/pages/supplier-details/SupplierDetailsPage'
import { REQUIRED_FIELD } from '@/src/constants/form'
import { MaskedInput } from '@/src/components/MaskedInput'

import styles from './styles.module.scss'

function OwnerDetailsSection() {
  const { register, control } = useFormContext<FormData>()

  return (
    <section className={styles['c-owner-details-section']}>
      <h2 className={styles['c-owner-details-section__subtitle']}>Owner</h2>
      <Input
        label="Name"
        className={styles['c-owner-details-section__input-name']}
        placeholder="Lady Gaga"
        {...register('ownerName', REQUIRED_FIELD)}
      />
      <Input
        label="Email"
        className={styles['c-owner-details-section__input-email']}
        placeholder="ladygaga@bol.com.br"
        type="email"
        {...register('ownerEmail', REQUIRED_FIELD)}
      />
      <Controller
        control={control}
        name="ownerPhoneNumber"
        render={({ field }) => (
          <MaskedInput
            label="Phone Number"
            mask="99 (99) 99999-9999"
            {...field}
            placeholder="55 (96) 8014-5614"
            className={styles['c-owner-details-section__input-phone-number']}
          />
        )}
      />
    </section>
  )
}

export default OwnerDetailsSection
