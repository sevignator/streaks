import { SignupForm } from '#/components/SignupForm'
import { createFileRoute } from '@tanstack/react-router'

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
