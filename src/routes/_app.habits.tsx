import { createFileRoute, Link } from '@tanstack/react-router'

import PageTitle from '#/components/PageTitle'

export const Route = createFileRoute('/_app/habits')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="container">
      <PageTitle text="Habits" />

      <Link to="/habits/create">Create habit</Link>
    </div>
  )
}
