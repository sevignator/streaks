import { type LinkOptions } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';

import ThemeToggle from '#/components/ThemeToggle';
import NavLink from '#/components/NavLink';

import { userLogoutFn } from '#/utils/users.functions';
import { type AuthenticatedUser } from '#/utils/types';

interface NavLinkItem {
  icon: React.ReactNode;
  text: string;
  to: LinkOptions['to'];
}

const NAV_LINKS: NavLinkItem[] = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    ),
    text: 'Dashboard',
    to: '/dashboard',
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21.801 10A10 10 0 1 1 17 3.335" />
        <path d="m9 11 3 3L22 4" />
      </svg>
    ),
    text: 'Habits',
    to: '/habits',
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 16v5" />
        <path d="M16 14v7" />
        <path d="M20 10v11" />
        <path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" />
        <path d="M4 18v3" />
        <path d="M8 14v7" />
      </svg>
    ),
    text: 'Stats',
    to: '/stats',
  },
];

interface SidebarProps {
  user: AuthenticatedUser;
  isOpen: boolean;
}

export default function Sidebar({ user, isOpen }: SidebarProps) {
  const userLogout = useServerFn(userLogoutFn);

  async function handleLogout() {
    await userLogout();
  }

  return (
    <nav className="relative col-2 row-1 w-(--size-sidebar) transition-transform">
      <div className="flex h-full flex-col py-4 pl-4" inert={!isOpen}>
        <div className="flex flex-col gap-1">
          {NAV_LINKS.map(({ icon, text, to }) => {
            return to ? (
              <NavLink key={text} icon={icon} text={text} to={to} />
            ) : null;
          })}
        </div>

        <div className="mt-auto">
          {user?.email}
          <button onClick={handleLogout}>Logout</button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
