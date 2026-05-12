import { createFileRoute, Outlet } from '@tanstack/react-router';

import TabSelector from '#/components/TabSelector';

export const Route = createFileRoute('/_user')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-8xl mt-12 mb-18 font-extrabold text-center text-violet-950 tracking-tighter">
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
