import { createServerFn } from '@tanstack/react-start';
import { Resend } from 'resend';
import { z } from 'zod';

import { env } from '../env';
import { emailSchema } from '#/utils/schemas';

const resend = new Resend(env.RESEND_API_KEY);

const sendEmailSchema = z.object({
  email: emailSchema,
});

export const sendEmailFn = createServerFn({ method: 'POST' })
  .inputValidator((input: z.input<typeof sendEmailSchema>) => input)
  .handler(async ({ data }) => {
    const { email } = data;
    const { error } = await resend.emails.send({
      from: 'Streaks <notification@streaks.fyi>',
      to: email.to,
      subject: email.subject,
      html: email.html,
    });

    if (error) {
      console.error(error);
    }
  });

export const sendPasswordResetEmailFn = createServerFn({ method: 'POST' });
