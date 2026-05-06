import {
  authenticateUser,
  createUser,
  getUserByEmail,
  getUserById,
} from '#/utils/users.server.ts'
import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { useAppSession } from '#/utils/session.ts'

const userSignupSchema = z
  .object({
    nickname: z.string().max(30, 'Nickname must be at most 30 characters long'),
    email: z.email().max(255, 'Email must be at most 255 characters long'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(100, 'Password must be at most 100 characters long'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

const userResetPasswordSchema = z.object({
  email: z.email().max(255, 'Email must be at most 255 characters long'),
})

const userLoginSchema = z.object({
  email: z.email().max(255, 'Email must be at most 255 characters long'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password must be at most 100 characters long'),
})

export const userSignupFn = createServerFn({ method: 'POST' })
  .inputValidator((input: z.input<typeof userSignupSchema>) => input)
  .handler(async ({ data }) => {
    const result = userSignupSchema.safeParse(data)

    if (!result.success) {
      const { fieldErrors, formErrors } = z.flattenError(result.error)

      return {
        fieldErrors,
        formErrors,
      }
    }

    try {
      const user = await getUserByEmail(data.email)

      if (user) {
        return {
          fieldErrors: {
            email: ['This user already exists'],
          },
          formErrors: [],
        }
      }

      await createUser(data.nickname, data.email, data.password)
    } catch (err) {
      console.error(err)
    }

    throw redirect({ to: '/dashboard' })
  })

export const userResetPasswordFn = createServerFn({
  method: 'POST',
})
  .inputValidator((input: z.input<typeof userResetPasswordSchema>) => input)
  .handler(async ({ data }) => {
    const result = userResetPasswordSchema.safeParse(data)

    if (!result.success) {
      const { fieldErrors, formErrors } = z.flattenError(result.error)

      return {
        fieldErrors,
        formErrors,
      }
    }

    console.log(result.data)
  })

export const userLoginFn = createServerFn({ method: 'POST' })
  .inputValidator((input: z.input<typeof userLoginSchema>) => input)
  .handler(async ({ data }) => {
    const result = userLoginSchema.safeParse(data)

    if (!result.success) {
      const { fieldErrors, formErrors } = z.flattenError(result.error)

      return {
        fieldErrors,
        formErrors,
      }
    }

    const user = await authenticateUser(data.email, data.password)

    if (!user) {
      return {
        fieldErrors: {},
        formErrors: ['Invalid login credentials'],
      }
    }

    const session = await useAppSession()
    await session.update({
      userId: user.id,
      email: user.email,
    })

    throw redirect({ to: '/dashboard' })
  })

export const userLogoutFn = createServerFn({ method: 'POST' }).handler(
  async () => {
    const session = await useAppSession()
    await session.clear()

    throw redirect({ to: '/' })
  },
)

export const getCurrentUserFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const session = await useAppSession()
    const { userId } = session.data

    if (!userId) {
      return null
    }

    return await getUserById(userId)
  },
)

// References:
// - Input validation of server functions with Zod: https://tanstack.com/start/latest/docs/framework/react/guide/authentication#4-input-validation
// - Refined validation for comparing two values with Zod: https://zod.dev/api?id=refinements
