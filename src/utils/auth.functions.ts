import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import {
  getPasswordResetTokenByHash,
  getPasswordResetTokenHash,
  redeemPasswordResetToken,
  updateUserPassword,
} from '#/utils/auth.server'
import { getUserById } from '#/utils/users.server'
import { type User } from '#/db/schema'
import { redirect } from '@tanstack/react-router'

const getPasswordResetTokenDataSchema = z.object({
  token: z.string(),
})

export const getPasswordResetTokenDataFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (input: z.input<typeof getPasswordResetTokenDataSchema>) => input,
  )
  .handler(async ({ data }) => {
    const { token } = data

    const tokenHash = getPasswordResetTokenHash(token)
    const resetTokenRecord = await getPasswordResetTokenByHash(tokenHash)

    if (!resetTokenRecord || resetTokenRecord.isRedeemed) return null

    const now = new Date()
    const resetTokenHasExpired = resetTokenRecord.expiresAt < now

    if (resetTokenHasExpired) return null

    const user = await getUserById(resetTokenRecord.userId)

    if (!user) return null

    return { user }
  })

const updateUserPasswordSchema = z.object({
  userId: z.number(),
  newPassword: z.string(),
}) satisfies z.ZodType<{
  userId: User['id']
}>

export const updateUserPasswordFn = createServerFn({ method: 'POST' })
  .inputValidator((input: z.input<typeof updateUserPasswordSchema>) => input)
  .handler(async ({ data }) => {
    const { userId, newPassword } = data

    await updateUserPassword(userId, newPassword)

    throw redirect({
      to: '/login',
      search: {
        message: 'password-updated',
      },
    })
  })

const updateUserPasswordWithTokenSchema = z.object({
  token: z.string(),
  userId: z.number(),
  newPassword: z.string(),
}) satisfies z.ZodType<{
  userId: User['id']
}>

export const updateUserPasswordWithTokenFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (input: z.input<typeof updateUserPasswordWithTokenSchema>) => input,
  )
  .handler(async ({ data }) => {
    const { token, userId, newPassword } = data

    await redeemPasswordResetToken(token)

    await updateUserPasswordFn({
      data: {
        userId,
        newPassword,
      },
    })
  })
