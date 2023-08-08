import { Controller, useFormContext } from 'react-hook-form'

import { Input } from '@/src/components/Input'
import { FormData } from '@/src/pages/supplier-details/SupplierDetailsPage'
import { REQUIRED_FIELD } from '@/src/constants/form'
import { MaskedInput } from '@/src/components/MaskedInput'

import styles from './styles.module.scss'

function SupplierDetailsSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FormData>()

  return (
    <section className={styles['c-supplier-details-section']}>
      <Input
        label="Name"
        className={styles['c-supplier-details-section__input-name']}
        placeholder="Distribuidora A"
        error={errors.name?.message}
        {...register('name', REQUIRED_FIELD)}
      />
      <Controller
        control={control}
        name="cnpj"
        rules={REQUIRED_FIELD}
        render={({ field: { ref, ...restFields } }) => (
          <MaskedInput
            label="CNPJ"
            mask="99.999.999/9999-99"
            {...restFields}
            placeholder="22.222.333/3333-33"
            error={errors.cnpj?.message}
            className={styles['c-supplier-details-section__input-cnpj']}
          />
        )}
      />

      <Controller
        control={control}
        name="phoneNumber"
        rules={REQUIRED_FIELD}
        render={({ field: { ref, ...restFields } }) => (
          <MaskedInput
            label="Phone Number"
            mask="99 (99) 99999-9999"
            {...restFields}
            error={errors.phoneNumber?.message}
            placeholder="55 (96) 8014-5614"
            className={styles['c-supplier-details-section__input-phone-number']}
          />
        )}
      />
    </section>
  )
}

export default SupplierDetailsSection
