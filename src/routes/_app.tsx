import { useState } from 'react';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import clsx from 'clsx';

import Sidebar from '#/components/Sidebar';
import Navbar from '#/components/Navbar';
import { getCurrentUserFn, getUserImageUrlFn } from '#/utils/users.functions';
import { getLocalTimezone } from '#/utils/datetime';

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
  beforeLoad: async () => {
    const currentUser = await getCurrentUserFn();

    if (!currentUser) {
      throw redirect({
        to: '/',
      });
    }

    const { id, nickname, email } = currentUser;
    const imageUrl = await getUserImageUrlFn({ data: { email } });
    const timezone = getLocalTimezone();

    return {
      user: {
        id,
        nickname,
        email,
        imageUrl,
        timezone,
      },
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
      <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      <div
        className={clsx(
          'grid flex-1 grid-rows-[min-content_1fr] overflow-x-clip transition-[grid-template-columns] md:grid-rows-1',
          isMenuOpen
            ? 'grid-cols-none md:grid-cols-[1fr_var(--size-sidebar)]'
            : 'grid-cols-none md:grid-cols-[1fr_0]',
        )}
      >
        <Sidebar
          user={user}
          inert={!isMenuOpen}
          className={clsx(
            'flex flex-col overflow-clip transition-[height]',
            isMenuOpen ? 'h-auto' : 'h-0 md:h-auto',
          )}
        />

        <main className="flex flex-col p-2 pt-0 md:col-1 md:row-1">
          <div className="container flex-1 rounded-3xl border border-slate-300 bg-(--clr-bg-secondary) px-[clamp(10px,2.5vw,40px)] py-10 dark:border-slate-950">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
