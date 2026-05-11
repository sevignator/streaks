import { createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useForm } from '@tanstack/react-form'
import z from 'zod'

import {
  emailInputSchema,
  nicknameInputSchema,
  passwordInputSchema,
} from '#/utils/schemas'
import { userSignupFn } from '#/utils/users.functions'

import InputField from '#/components/InputField'
import SubmitButton from '#/components/SubmitButton'

export const Route = createFileRoute('/_user/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  const signupUser = useServerFn(userSignupFn)
  const form = useForm({
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => {
      const { nickname, email, password, confirmPassword } = value

      await signupUser({ data: { nickname, email, password, confirmPassword } })
    },
  })

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit(e)
        }}
        className="flex flex-col gap-6"
      >
        <form.Field
          name="nickname"
          validators={{
            onBlur: nicknameInputSchema,
          }}
          children={(field) => (
            <InputField field={field} label="Nickname" type="text" />
          )}
        />

        <form.Field
          name="email"
          validators={{
            onBlur: emailInputSchema,
          }}
          children={(field) => (
            <InputField field={field} label="Email" type="email" />
          )}
        />

        <form.Field
          name="password"
          validators={{
            onBlur: passwordInputSchema,
          }}
          children={(field) => (
            <InputField field={field} label="Password" type="password" />
          )}
        />

        <form.Field
          name="confirmPassword"
          validators={{
            onBlur: z
              .string()
              .refine((data) => data === form.getFieldValue('password'), {
                message: 'Passwords do not match',
                path: ['confirmPassword'],
              }),
          }}
          children={(field) => (
            <InputField
              field={field}
              label="Confirm password"
              type="password"
            />
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <SubmitButton
              label="Sign up"
              canSubmit={canSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        />
      </form>
    </div>
  )
}
