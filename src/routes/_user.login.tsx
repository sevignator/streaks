import { createFileRoute, Link } from '@tanstack/react-router'

import { LoginForm } from '#/components/LoginForm'
import z from 'zod'

export const Route = createFileRoute('/_user/login')({
  component: RouteComponent,
  validateSearch: z.object({
    message: z.string().optional(),
  }),
})

function RouteComponent() {
  const search = Route.useSearch()

  return (
    <div>
      {search.message === 'password-reset' && (
        <p className="p-2 bg-green-100 border-green-200 border rounded-md text-green-600 text-center mb-6">
          A password reset email has been sent to the email address you
          provided.
        </p>
      )}

      {search.message === 'password-updated' && (
        <p className="p-2 bg-green-100 border-green-200 border rounded-md text-green-600 text-center mb-6">
          Your password has successfully been updated.
        </p>
      )}

      <LoginForm />

      <p className="text-center mt-4">
        <Link to="/login/reset">Reset password</Link>
      </p>
    </div>
  )
}
