import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('production'),
  API_URL: z.string(),
  CAYENA_USER_NAME: z.string(),
  CAYENA_AUTH_TOKEN: z.string(),
})

const envVariables = {
  NODE_ENV: process.env.NODE_ENV,
  API_URL: process.env.API_URL,
  CAYENA_USER_NAME: process.env.CAYENA_USER_NAME,
  CAYENA_AUTH_TOKEN: process.env.CAYENA_AUTH_TOKEN,
}

const _env = envSchema.safeParse(envVariables)

console.log({ _env })

if (!_env.success) {
  console.log('Something went wrong with env variables', _env.error.format())
  throw new Error('Invalid env variables')
}

export const env = _env.data
