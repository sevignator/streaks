import React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'

import { userSignupFn } from '#/utils/users.functions'

type SignupErrors = Awaited<ReturnType<typeof userSignupFn>>

export const Route = createFileRoute('/_user/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <SignupForm />
    </div>
  )
}

export function SignupForm() {
  const handleSignup = useServerFn(userSignupFn)
  const [nickname, setNickname] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [errors, setErrors] = React.useState<SignupErrors | null>(null)

  async function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault()

    const submissionErrors = await handleSignup({
      data: { nickname, email, password, confirmPassword },
    })

    setErrors(submissionErrors)
  }

  return (
    <form
      onSubmit={handleSubmit}
      id="signup-form"
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col">
        <label htmlFor="signup-nickname" className="text-xl font-semibold">
          Nickname
        </label>
        <input
          type="nickname"
          id="signup-nickname"
          name="nickname"
          value={nickname}
          onChange={(event) => setNickname(event.currentTarget.value)}
          className="border-solid border-2 border-slate-300 rounded-md text-2xl p-2"
        />
        <div className="text-rose-600">{errors?.fieldErrors?.nickname}</div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="signup-email" className="text-xl font-semibold">
          Email
        </label>
        <input
          type="email"
          id="signup-email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          className="border-solid border-2 border-slate-300 rounded-md text-2xl p-2"
        />
        <div className="text-rose-600">{errors?.fieldErrors?.email}</div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="signup-password" className="text-xl font-semibold">
          Password
        </label>
        <input
          type="password"
          id="signup-password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          className="border-solid border-2 border-slate-300 rounded-md text-2xl p-2"
        />
        <div className="text-rose-600">{errors?.fieldErrors?.password}</div>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="signup-confirm-password"
          className="text-xl font-semibold"
        >
          Confirm password
        </label>
        <input
          type="password"
          id="signup-confirm-password"
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
        Sign up
      </button>
    </form>
  )
}
