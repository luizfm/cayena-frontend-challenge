import { Controller, useFormContext } from 'react-hook-form'

import { Input } from '@/src/components/Input'
import { FormData } from '@/src/pages/supplier-details/SupplierDetailsPage'
import { REQUIRED_FIELD } from '@/src/constants/form'
import { MaskedInput } from '@/src/components/MaskedInput'

import styles from './styles.module.scss'

function SupplierDetailsSection() {
  const { register, control } = useFormContext<FormData>()

  return (
    <section className={styles['c-supplier-details-section']}>
      <Input
        label="Name"
        className={styles['c-supplier-details-section__input-name']}
        placeholder="Distribuidora A"
        {...register('name', REQUIRED_FIELD)}
      />
      <Controller
        control={control}
        name="cnpj"
        render={({ field }) => (
          <MaskedInput
            label="CNPJ"
            mask="99.999.999/9999-99"
            {...field}
            placeholder="22.222.333/3333-33"
            className={styles['c-supplier-details-section__input-cnpj']}
          />
        )}
      />

      <Controller
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <MaskedInput
            label="Phone Number"
            mask="99 (99) 99999-9999"
            {...field}
            placeholder="55 (96) 8014-5614"
            className={styles['c-supplier-details-section__input-phone-number']}
          />
        )}
      />
    </section>
  )
}

export default SupplierDetailsSection
