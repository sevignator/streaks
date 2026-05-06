import React from 'react'
import { useServerFn } from '@tanstack/react-start'

import { sendTestEmailFn } from '#/utils/email.functions'
import { userResetPasswordFn } from '#/utils/users.functions'

type LoginErrors = Awaited<ReturnType<typeof userResetPasswordFn>>

export default function ResetPasswordForm() {
  const handleResetPassword = useServerFn(userResetPasswordFn)
  const [email, setEmail] = React.useState('')
  const [errors, setErrors] = React.useState<LoginErrors | null>(null)
  const setTestEmail = useServerFn(sendTestEmailFn)

  async function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault()

    const submissionErrors = await handleResetPassword({
      data: { email },
    })

    setErrors(submissionErrors)

    if (submissionErrors?.fieldErrors || submissionErrors?.formErrors) {
      return
    }

    // @TODO: Add password reset steps
    // 1. Check user email in the database
    //   1a. If the user exists, store them in a variable and move on.
    //   1b. If the user does not exist, show the default pop-up message and go back to the log in form (see step 3).
    // 2. Send an email to the user that contains a link to edit their password.
    // 3. Show a default pop-up message indicating that, if a matching account was found, the user should be receiving an email.
    //   * This is done for security purposes--we don't want to allow bad actors to be able to infer whether an account exists on the system.

    // await setTestEmail({
    //   data: {
    //     to: email,
    //     token: 'random_token_123',
    //   },
    // })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col">
        <label htmlFor="login-email" className="text-xl font-semibold">
          Email
        </label>
        <input
          type="email"
          id="login-email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          className="border-solid border-2 border-slate-300 rounded-md text-2xl p-2"
        />
        <div className="text-rose-600">{errors?.fieldErrors?.email}</div>
      </div>

      <button
        type="submit"
        className="bg-violet-600 rounded-md p-3 text-xl text-slate-50 font-bold cursor-pointer"
      >
        Reset password
      </button>
    </form>
  )
}
