import { createFileRoute } from '@tanstack/react-router'

import PageTitle from '#/components/PageTitle'

export const Route = createFileRoute('/_app/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = Route.useRouteContext()

  return (
    <div className="container">
      <PageTitle text={`${user.nickname}'s dashboard`} />
    </div>
  )
}
