import ThemeToggle from './ThemeToggle'
import NavLink from './Navlink'

export default function Sidebar() {
  return (
    <header className="bg-[var(--clr-bg-secondary)] h-dvh p-4">
      <nav className="flex flex-col h-full">
        <div className="font-black text-2xl mb-4 p-4">Streaks</div>

        <div className="flex flex-col">
          <NavLink text="Dashboard" to="/" />
          <NavLink text="Habits" to="/habits" />
          <NavLink text="Statistics" to="/statistics" />
        </div>

        <div className="mt-auto">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
