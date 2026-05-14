import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { AuthProvider } from '#/contexts/auth';
import { getCurrentUserFn } from '#/utils/users.functions';

import Sidebar from '../components/Sidebar';
import { useState } from 'react';
import clsx from 'clsx';
import SidebarToggle from '#/components/SidebarToggle';
import SiteHeader from '#/components/SiteHeader';

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
  beforeLoad: async () => {
    const user = await getCurrentUserFn();

    if (!user) {
      throw redirect({
        to: '/',
      });
    }

    return { user };
  },
});

function RouteComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <AuthProvider>
      <div
        className={clsx([
          'grid',
          'transition-[grid-template-columns]',
          'overflow-x-clip',
          isMenuOpen
            ? 'grid-cols-[1fr_var(--size-sidebar)]'
            : 'grid-cols-[1fr_0]',
        ])}
      >
        <Sidebar isOpen={isMenuOpen} />
        <main className="col-1 row-1">
          <SiteHeader isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  );
}
