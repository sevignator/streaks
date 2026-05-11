import z from 'zod'

export const userIdSchema = z.number()

export const habitIdSchema = z.number()

export const habitCreatedAt = z.date()

export const nicknameInputSchema = z
  .string()
  .max(30, 'Nickname must be at most 30 characters long')

export const emailInputSchema = z
  .email()
  .max(255, 'Email must be at most 255 characters long')

export const passwordInputSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(100, 'Password must be at most 100 characters long')

export const userSignupSchema = z
  .object({
    nickname: nicknameInputSchema,
    email: emailInputSchema,
    password: passwordInputSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const userLoginSchema = z.object({
  email: emailInputSchema,
  password: passwordInputSchema,
})

export const userUpdatePasswordSchema = z.object({
  userId: userIdSchema,
  newPassword: passwordInputSchema,
})

export const userUpdatePasswordWithTokenSchema = z.object({
  token: z.string(),
  userId: userIdSchema,
  newPassword: passwordInputSchema,
})

export const emailSchema = z.object({
  to: z.string(),
  subject: z.string(),
  html: z.string(),
})

export const createHabitSchema = z.object({
  title: z.string(),
  userId: userIdSchema,
  interval: z.number(),
})
