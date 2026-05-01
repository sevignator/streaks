import { createFileRoute } from '@tanstack/react-router'

import PageTitle from '#/components/PageTitle'

export const Route = createFileRoute('/_app/habits')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="container">
      <PageTitle text="Habits" />
    </div>
  )
}
