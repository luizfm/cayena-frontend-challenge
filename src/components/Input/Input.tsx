import classNames from 'classnames'
import { InputHTMLAttributes, forwardRef } from 'react'

import styles from './styles.module.scss'

type InputCustomProps = {
  className?: string
  label: string
  hiddenLabel?: boolean
  error?: string
}

export type InputProps = InputCustomProps &
  InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, hiddenLabel = false, error, ...restInputProps },
    ref,
  ) => {
    return (
      <div
        className={classNames(
          styles['c-input__wrapper'],
          { [styles['c-input__wrapper--hidden']]: hiddenLabel },
          className,
        )}
      >
        <label
          className={classNames(styles['c-input__label'], {
            [styles['c-input__label--error']]: !!error,
            [styles['c-input__label--hidden']]: hiddenLabel,
          })}
        >
          {label}
        </label>
        <input
          ref={ref}
          {...restInputProps}
          className={classNames(styles['c-input'], {
            [styles['c-input--error']]: !!error,
          })}
        />
        {Boolean(error) && (
          <span className={styles['c-input__error-message']}>{error}</span>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
export default Input
