import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { AuthProvider } from '#/contexts/auth'
import Sidebar from '../components/Sidebar'
import { getCurrentUserFn } from '#/utils/users.functions'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
  beforeLoad: async () => {
    const user = await getCurrentUserFn()

    if (!user) {
      throw redirect({
        to: '/',
      })
    }

    return { user }
  },
})

function RouteComponent() {
  return (
    <AuthProvider>
      <div className="grid grid-cols-[20rem_1fr]">
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  )
}
