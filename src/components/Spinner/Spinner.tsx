import classNames from 'classnames'
import styles from './styles.module.scss'

type SpinnerProps = {
  size?: 'small' | 'large'
}

function Spinner({ size = 'large' }: SpinnerProps) {
  return (
    <div
      className={classNames(styles['c-spinner'], {
        [styles['c-spinner--small']]: size === 'small',
      })}
    />
  )
}

export default Spinner
