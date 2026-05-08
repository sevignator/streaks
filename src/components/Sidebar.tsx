import ThemeToggle from '#/components/ThemeToggle'
import NavLink from '#/components/NavLink'

import { useAuth } from '#/contexts/auth'
import { userLogoutFn } from '#/utils/users.functions'
import { useServerFn } from '@tanstack/react-start'

export default function Sidebar() {
  const { user } = useAuth()
  const userLogout = useServerFn(userLogoutFn)

  async function handleLogout() {
    await userLogout()
  }

  return (
    <header className="bg-(--clr-bg-secondary) h-dvh p-4">
      <nav className="flex flex-col h-full">
        <div className="font-black text-2xl mb-4 p-4">Streaks</div>

        <div className="flex flex-col">
          <NavLink text="Dashboard" to="/dashboard" />
          <NavLink text="Habits" to="/habits" />
          <NavLink text="Statistics" to="/statistics" />
        </div>

        <div className="mt-auto">
          {user?.email}
          <button onClick={handleLogout}>Logout</button>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
