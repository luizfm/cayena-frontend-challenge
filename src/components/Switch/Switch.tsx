import * as RadixSwitch from '@radix-ui/react-switch'

import styles from './styles.module.scss'
import classNames from 'classnames'

type SwitchProps = {
  className?: string
  onCheckedChange: () => void
}

function Switch({ className, onCheckedChange }: SwitchProps) {
  return (
    <RadixSwitch.Root
      className={classNames(styles['c-switch'], className)}
      onCheckedChange={onCheckedChange}
      title="switch theme"
    >
      <RadixSwitch.Thumb className={styles['c-switch__thumb']} />
    </RadixSwitch.Root>
  )
}

export default Switch
