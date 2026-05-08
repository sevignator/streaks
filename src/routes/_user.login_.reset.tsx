import React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'

import { userResetPasswordFn } from '#/utils/users.functions'

type LoginErrors = Awaited<ReturnType<typeof userResetPasswordFn>>

export const Route = createFileRoute('/_user/login_/reset')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <ResetPasswordForm />
    </div>
  )
}

export default function ResetPasswordForm() {
  const handleResetPassword = useServerFn(userResetPasswordFn)
  const [email, setEmail] = React.useState('')
  const [errors, setErrors] = React.useState<LoginErrors | null>(null)

  async function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault()

    const submissionErrors = await handleResetPassword({
      data: { email },
    })

    setErrors(submissionErrors)

    if (submissionErrors?.fieldErrors || submissionErrors?.formErrors) {
      return
    }
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
