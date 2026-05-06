import ResetPasswordForm from '#/components/ResetPasswordForm'
import { createFileRoute } from '@tanstack/react-router'

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
