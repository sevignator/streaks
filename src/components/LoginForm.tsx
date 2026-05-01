import React from 'react'
import { useServerFn } from '@tanstack/react-start'

import { userLoginFn } from '#/utils/users.functions'

type LoginErrors = Awaited<ReturnType<typeof userLoginFn>>

export function LoginForm() {
  const handleLogin = useServerFn(userLoginFn)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [errors, setErrors] = React.useState<LoginErrors | null>(null)

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const submissionErrors = await handleLogin({ data: { email, password } })

    setErrors(submissionErrors)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        id="login-form"
        className="flex flex-col gap-6"
      >
        {errors?.formErrors}

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

        <div className="flex flex-col">
          <label htmlFor="login-password" className="text-xl font-semibold">
            Password
          </label>
          <input
            type="password"
            id="login-password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            className="border-solid border-2 border-slate-300 rounded-md text-2xl p-2"
          />
          <div className="text-rose-600">{errors?.fieldErrors?.password}</div>
        </div>

        <button
          type="submit"
          className="bg-violet-600 rounded-md p-3 text-xl text-slate-50 font-bold cursor-pointer"
        >
          Log in
        </button>
      </form>
    </>
  )
}
