import { createEnv } from '@t3-oss/env-core'
import z from 'zod'

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['production', 'development', 'test']),
    DATABASE_URL: z.url(),
    SESSION_SECRET: z.string(),
    RESET_TOKEN_SECRET: z.string(),
    RESEND_API_KEY: z.string(),
  },

  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})
