import { createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useForm } from '@tanstack/react-form'

import { emailInputSchema } from '#/utils/schemas'
import { userResetPasswordFn } from '#/utils/users.functions'

import InputField from '#/components/InputField'
import SubmitButton from '#/components/SubmitButton'

export const Route = createFileRoute('/_user/login_/reset')({
  component: RouteComponent,
})

function RouteComponent() {
  const userResetPassword = useServerFn(userResetPasswordFn)
  const form = useForm({
    defaultValues: {
      email: '',
    },
    onSubmit: async ({ value }) => {
      const { email } = value
      await userResetPassword({ data: email })
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
          name="email"
          validators={{
            onBlur: emailInputSchema,
          }}
          children={(field) => (
            <InputField field={field} label="Email" type="email" />
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <SubmitButton
              label="Reset password"
              canSubmit={canSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        />
      </form>
    </div>
  )
}
