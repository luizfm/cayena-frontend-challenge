import classNames from 'classnames'
import { ButtonHTMLAttributes } from 'react'

import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import { Spinner } from '../Spinner'

type ButtonCustomProps = {
  className?: string
  isLoading?: boolean
  variant?: 'primary' | 'secondary'
  to?: string
}

type ButtonProps = ButtonCustomProps & ButtonHTMLAttributes<HTMLButtonElement>

function Button({
  className,
  variant = 'primary',
  children,
  isLoading = false,
  to,
  ...restButtonProps
}: ButtonProps) {
  if (to) {
    return (
      <Link
        to={to}
        className={classNames(
          styles['c-button'],
          styles[`c-button--${variant}`],
          className,
        )}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      className={classNames(
        styles['c-button'],
        styles[`c-button--${variant}`],
        className,
      )}
      // disabled={isLoading}
      type="button"
      {...restButtonProps}
    >
      {isLoading && <Spinner size="small" />}
      {!isLoading && children}
    </button>
  )
}

export default Button
