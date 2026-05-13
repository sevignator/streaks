import { createFileRoute, Outlet } from '@tanstack/react-router';

import TabSelector from '#/components/TabSelector';

export const Route = createFileRoute('/_user')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mt-12 mb-18 text-center text-8xl font-extrabold tracking-tighter text-violet-950">
        Streaks
      </h1>

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
  );
}
