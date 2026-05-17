import { redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

import {
  inputEmailSchema,
  inputNicknameSchema,
  inputPasswordSchema,
} from '#/utils/schemas';
import { useAppSession } from '#/utils/session';
import {
  authenticateUser,
  createUser,
  getUserByEmail,
  getUserById,
  getUserImageUrl,
} from '#/utils/users.server';
import { sendEmailFn } from '#/utils/email.functions';
import { createPasswordResetToken } from '#/utils/auth.server';

export const userSignupSchema = z
  .object({
    nickname: inputNicknameSchema,
    email: inputEmailSchema,
    password: inputPasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const userSignupFn = createServerFn({ method: 'POST' })
  .inputValidator((input: z.input<typeof userSignupSchema>) => input)
  .handler(async ({ data }) => {
    const user = await getUserByEmail(data.email);

    if (user) return;

    await createUser(data.nickname, data.email, data.password);

    throw redirect({
      to: '/login',
      search: {
        message: 'account-created',
      },
    });
  });

export const userResetPasswordFn = createServerFn({
  method: 'POST',
})
  .inputValidator((input: z.input<typeof inputEmailSchema>) => input)
  .handler(async ({ data }) => {
    const user = await getUserByEmail(data);

    if (user) {
      const token = await createPasswordResetToken(user.id);

      await sendEmailFn({
        data: {
          to: user.email,
          subject: 'Password reset',
          html: `
            <p>Hi ${user.nickname}!</p>

            <p>A password reset was requested for your account. Visit the following link to reset your password:</p>

            <p>http://localhost:3000/login/reset/${token}</p>

            <p>This link is only valid for the next 30 minutes.</p>
          `,
        },
      });
    }

    throw redirect({
      to: '/login',
      search: {
        message: 'password-reset',
      },
    });
  });

export const userLoginSchema = z.object({
  email: inputEmailSchema,
  password: inputPasswordSchema,
});

export const userLoginFn = createServerFn({ method: 'POST' })
  .inputValidator((input: z.input<typeof userLoginSchema>) => input)
  .handler(async ({ data }) => {
    const user = await authenticateUser(data.email, data.password);

    if (!user) {
      return {
        fieldErrors: {},
        formErrors: ['Invalid login credentials'],
      };
    }

    const session = await useAppSession();
    await session.update({
      userId: user.id,
      email: user.email,
    });

    throw redirect({ to: '/dashboard' });
  });

export const userLogoutFn = createServerFn({ method: 'POST' }).handler(
  async () => {
    const session = await useAppSession();
    await session.clear();

    throw redirect({ to: '/' });
  },
);

export const getCurrentUserFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const session = await useAppSession();
    const { userId } = session.data;

    if (!userId) {
      return null;
    }

    return await getUserById(userId);
  },
);

const getUserImageUrlSchema = z.object({
  email: z.email(),
});

export const getUserImageUrlFn = createServerFn({
  method: 'GET',
})
  .inputValidator(getUserImageUrlSchema)
  .handler(async ({ data }) => {
    return getUserImageUrl(data.email);
  });
