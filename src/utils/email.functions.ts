import { createServerFn } from '@tanstack/react-start'
import { Resend } from 'resend'
import z from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const GENERIC_FROM = 'Streaks <notification@streaks.fyi>'

const testEmailSchema = z.object({
  to: z.string(),
  token: z.string(),
})

export const sendTestEmailFn = createServerFn({ method: 'POST' })
  .inputValidator((input: z.input<typeof testEmailSchema>) => input)
  .handler(async ({ data: handlerData }) => {
    const { data, error } = await resend.emails.send({
      from: GENERIC_FROM,
      to: handlerData.to,
      subject: 'Password reset',
      html: `<strong>Your token: ${handlerData.token}</strong>`,
    })

    if (error) {
      console.log(error)
      console.log('HANDLE ERROR, YOU FOOL!')
    }

    console.log(data)
  })

export const sendPasswordResetEmailFn = createServerFn({ method: 'POST' })
