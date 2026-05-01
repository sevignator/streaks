import { createFileRoute } from '@tanstack/react-router'

import PageTitle from '#/components/PageTitle'

export const Route = createFileRoute('/_app/statistics')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="container">
      <PageTitle text="Statistics" />
    </div>
  )
}
