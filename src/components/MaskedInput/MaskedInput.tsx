import classNames from 'classnames'
import { InputHTMLAttributes, forwardRef } from 'react'

import styles from './styles.module.scss'
import ReactInputMask from 'react-input-mask'

type InputCustomProps = {
  className?: string
  label: string
  hiddenLabel?: boolean
  error?: string
  mask: string
}

export type InputProps = InputCustomProps &
  InputHTMLAttributes<HTMLInputElement>

const MaskedInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hiddenLabel, error, mask, ...restInputProps }, ref) => {
    return (
      <div className={classNames(styles['c-masked-input__wrapper'], className)}>
        <label
          className={classNames(styles['c-masked-input__label'], {
            [styles['c-input__label--error']]: !!error,
            [styles['c-input__label--hidden']]: hiddenLabel,
          })}
        >
          {label}
        </label>
        <ReactInputMask
          mask={mask}
          ref={ref as React.RefObject<ReactInputMask>}
          {...restInputProps}
          className={classNames(styles['c-masked-input'], {
            [styles['c-masked-input--error']]: !!error,
          })}
        />
        {Boolean(error) && (
          <span className={styles['c-masked-input__error-message']}>
            {error}
          </span>
        )}
      </div>
    )
  },
)

MaskedInput.displayName = 'MaskedInput'

export default MaskedInput
