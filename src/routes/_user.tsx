import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

type Tab = {
  text: string
  to: string
}

export const Route = createFileRoute('/_user')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-5xl mt-12 mb-12 font-bold text-center">Streaks</h1>

      <TabSelector
        tabs={[
          {
            text: 'Log in',
            to: '/login',
          },
          {
            text: 'Sign up',
            to: '/signup',
          },
        ]}
      />

      <Outlet />
    </div>
  )
}

function TabSelector({ tabs }: { tabs: Tab[] }) {
  return (
    <div className="flex mb-8 max-w-fit bg-violet-200 rounded-full p-1.5 mx-auto">
      {tabs.map((tab) => (
        <Link
          to={tab.to}
          className="px-5 py-2"
          activeProps={{
            className: 'bg-violet-500 text-white rounded-full',
          }}
        >
          {tab.text}
        </Link>
      ))}
    </div>
  )
}
