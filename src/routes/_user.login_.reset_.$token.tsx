import React from 'react'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'

import { getPasswordResetTokenDataFn } from '#/utils/auth.functions'
import { updateUserPasswordWithTokenFn } from '#/utils/auth.functions'

type LoginErrors = Awaited<ReturnType<typeof updateUserPasswordWithTokenFn>>

export const Route = createFileRoute('/_user/login_/reset_/$token')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const { token } = params
    const data = await getPasswordResetTokenDataFn({ data: { token } })

    if (!data) {
      throw notFound()
    }

    return { data, token }
  },
})

function RouteComponent() {
  const { data, token } = Route.useLoaderData()

  return (
    <div>
      <UpdatePasswordForm token={token} userId={data.user.id} />
    </div>
  )
}

function UpdatePasswordForm({
  token,
  userId,
}: {
  token: string
  userId: number
}) {
  const updateUserPasswordWithToken = useServerFn(updateUserPasswordWithTokenFn)
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [errors, setErrors] = React.useState<LoginErrors | null>(null)

  async function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault()

    const submissionErrors = await updateUserPasswordWithToken({
      data: {
        token,
        userId,
        newPassword: password,
      },
    })

    setErrors(submissionErrors)

    if (submissionErrors?.fieldErrors || submissionErrors?.formErrors) {
      return
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col">
        <label htmlFor="update-password" className="text-xl font-semibold">
          Password
        </label>
        <input
          type="password"
          id="update-password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          className="border-solid border-2 border-slate-300 rounded-md text-2xl p-2"
        />
        <div className="text-rose-600">{errors?.fieldErrors?.password}</div>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="update-confirm-password"
          className="text-xl font-semibold"
        >
          Confirm password
        </label>
        <input
          type="password"
          id="update-confirm-password"
          name="confirm-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.currentTarget.value)}
          className="border-solid border-2 border-slate-300 rounded-md text-2xl p-2"
        />
        <div className="text-rose-600">
          {errors?.fieldErrors?.confirmPassword}
        </div>
      </div>

      <button
        type="submit"
        className="bg-violet-600 rounded-md p-3 text-xl text-slate-50 font-bold cursor-pointer"
      >
        Update password
      </button>
    </form>
  )
}
