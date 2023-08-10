import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('production'),
  API_URL: z.string(),
  CAYENA_USER_NAME: z.string(),
  CAYENA_AUTH_TOKEN: z.string(),
})

console.log({
  variables: [
    process.env,
    process.env.NODE_ENV,
    process.env.API_URL,
    process.env.CAYENA_USER_NAME,
    process.env.CAYENA_AUTH_TOKEN,
  ],
})

const _env = envSchema.safeParse(process.env)

console.log({ _env })

if (!_env.success) {
  console.log('Something went wrong with env variables', _env.error.format())
  throw new Error('Invalid env variables')
}

export const env = _env.data
