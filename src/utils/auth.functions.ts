import { redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

import {
  getPasswordResetTokenByHash,
  getPasswordResetTokenHash,
  redeemPasswordResetToken,
  updateUserPassword,
} from '#/utils/auth.server';
import { getServerDateFn } from '#/utils/datetime.function';
import { getUserById } from '#/utils/users.server';
import {
  inputPasswordSchema,
  userIdSchema,
  type passwordResetTokenSchema,
} from '#/utils/schemas';

export const getPasswordResetTokenDataFn = createServerFn({ method: 'POST' })
  .inputValidator((input: z.input<typeof passwordResetTokenSchema>) => input)
  .handler(async ({ data: token }) => {
    const tokenHash = getPasswordResetTokenHash(token);
    const resetTokenRecord = await getPasswordResetTokenByHash(tokenHash);

    if (!resetTokenRecord || resetTokenRecord.isRedeemed) return null;

    const now = await getServerDateFn();
    const resetTokenHasExpired = resetTokenRecord.expiresAt < now;

    if (resetTokenHasExpired) return null;

    const user = await getUserById(resetTokenRecord.userId);

    if (!user) return null;

    return { user };
  });

export const updateUserPasswordSchema = z.object({
  userId: userIdSchema,
  newPassword: inputPasswordSchema,
});

export const updateUserPasswordFn = createServerFn({ method: 'POST' })
  .inputValidator((input: z.input<typeof updateUserPasswordSchema>) => input)
  .handler(async ({ data }) => {
    const { userId, newPassword } = data;

    await updateUserPassword(userId, newPassword);

    throw redirect({
      to: '/login',
      search: {
        message: 'password-updated',
      },
    });
  });

export const updateUserPasswordWithTokenSchema = z.object({
  token: z.string(),
  userId: userIdSchema,
  newPassword: inputPasswordSchema,
});

export const updateUserPasswordWithTokenFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (input: z.input<typeof updateUserPasswordWithTokenSchema>) => input,
  )
  .handler(async ({ data }) => {
    const { token, userId, newPassword } = data;

    await redeemPasswordResetToken(token);

    await updateUserPasswordFn({
      data: {
        userId,
        newPassword,
      },
    });
  });
