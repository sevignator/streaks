import { createFileRoute } from '@tanstack/react-router'

import PageTitle from '#/components/PageTitle'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="container">
      <PageTitle text="Dashboard" />
    </div>
  )
}
