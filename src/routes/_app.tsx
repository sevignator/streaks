import { useState } from 'react';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import clsx from 'clsx';

import Sidebar from '#/components/Sidebar';
import SiteHeader from '#/components/SiteHeader';
import { getCurrentUserFn } from '#/utils/users.functions';
import { getLocalTimezone } from '#/utils/datetime';

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const currentUser = await getCurrentUserFn();

    if (!currentUser) {
      throw redirect({
        to: '/',
      });
    }

    const { id, nickname, email } = currentUser;
    const timezone = getLocalTimezone();

    context.user = {
      id,
      nickname,
      email,
      timezone,
    };
  },
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className="flex min-h-lvh flex-col">
      <SiteHeader isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      <div
        className={clsx([
          'grid flex-1 overflow-x-clip transition-[grid-template-columns]',
          isMenuOpen
            ? 'grid-cols-[1fr_var(--size-sidebar)]'
            : 'grid-cols-[1fr_0]',
        ])}
      >
        <Sidebar user={user} isOpen={isMenuOpen} />

        <main className="col-1 row-1 flex flex-col p-4">
          <div className="container flex-1 rounded-3xl border border-slate-300 bg-(--clr-bg-secondary) px-[clamp(20px,2.5vw,40px)] py-[clamp(20px,2.5vw,40px)] dark:border-slate-950">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
