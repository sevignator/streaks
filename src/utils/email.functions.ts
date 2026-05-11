import { createServerFn } from '@tanstack/react-start'
import { Resend } from 'resend'
import z from 'zod'

import { emailSchema } from '#/utils/schemas'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmailFn = createServerFn({ method: 'POST' })
  .inputValidator((input: z.input<typeof emailSchema>) => input)
  .handler(async ({ data: handlerData }) => {
    const { data, error } = await resend.emails.send({
      from: 'Streaks <notification@streaks.fyi>',
      to: handlerData.to,
      subject: handlerData.subject,
      html: handlerData.html,
    })

    if (error) {
      console.error(error)
    }
  })

export const sendPasswordResetEmailFn = createServerFn({ method: 'POST' })
