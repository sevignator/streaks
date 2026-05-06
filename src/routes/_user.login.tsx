import { createFileRoute, Link } from '@tanstack/react-router'

import { LoginForm } from '#/components/LoginForm'

export const Route = createFileRoute('/_user/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <LoginForm />

      <p className="text-center mt-4">
        <Link to="/login/reset">Reset password</Link>
      </p>
    </div>
  )
}
