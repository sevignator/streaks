import { createFileRoute, Outlet } from '@tanstack/react-router';

import TabSelector from '#/components/TabSelector';
import Logo from '#/components/Logo';

export const Route = createFileRoute('/_user')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-12 text-center">
        <Logo size="clamp(60px, 10vw, 90px" />
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
