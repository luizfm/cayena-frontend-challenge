import { Input } from '@/src/components/Input'

import styles from './styles.module.scss'
import { Button } from '@/src/components/Button'
import { useLogin } from '@/src/hooks/useLogin'
import { useForm } from 'react-hook-form'
import { REQUIRED_FIELD } from '@/src/constants/form'
import { useAuth } from '@/src/hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { getToken } from '@/src/utils/token'

type FormData = {
  username: string
  password: string
}

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const { mutate, isLoading } = useLogin()
  const { user } = useAuth()

  const onSubmit = handleSubmit((formData) => {
    const form = new FormData()

    form.append('grant_type', 'password')
    form.append('scope', 'web')
    form.append('username', formData.username)
    form.append('password', formData.password)

    mutate(form)
  })

  getToken()

  if (user) {
    return <Navigate to="/suppliers" />
  }

  return (
    <main className={styles['c-login-page']}>
      <div className={styles['c-login-page__form-wrapper']}>
        <h1 className={styles['c-login-page__title']}>Login</h1>
        <form className={styles['c-login-page__form']} onSubmit={onSubmit}>
          <Input
            label="Username"
            placeholder="Username"
            hiddenLabel
            {...register('username', REQUIRED_FIELD)}
            error={errors?.username?.message}
          />
          <Input
            label="Password"
            placeholder="Password"
            type="password"
            hiddenLabel
            {...register('password', REQUIRED_FIELD)}
            error={errors?.password?.message}
          />

          <Button isLoading={isLoading} type="submit">
            Sign in
          </Button>
        </form>
      </div>
    </main>
  )
}

export default LoginPage
