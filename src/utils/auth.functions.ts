import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import z from 'zod'

import {
  userUpdatePasswordSchema,
  userUpdatePasswordWithTokenSchema,
} from '#/schemas/inputs.schemas'
import {
  getPasswordResetTokenByHash,
  getPasswordResetTokenHash,
  redeemPasswordResetToken,
  updateUserPassword,
} from '#/utils/auth.server'
import { getUserById } from '#/utils/users.server'
import { passwordResetTokenDataSchema } from '#/schemas/users.schemas'

export const getPasswordResetTokenDataFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (input: z.input<typeof passwordResetTokenDataSchema>) => input,
  )
  .handler(async ({ data: token }) => {
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

export const updateUserPasswordFn = createServerFn({ method: 'POST' })
  .inputValidator((input: z.input<typeof userUpdatePasswordSchema>) => input)
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

export const updateUserPasswordWithTokenFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (input: z.input<typeof userUpdatePasswordWithTokenSchema>) => input,
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
