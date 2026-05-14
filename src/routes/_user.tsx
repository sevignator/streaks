import { createFileRoute, Outlet } from '@tanstack/react-router';

import TabSelector from '#/components/TabSelector';
import Logo from '#/components/Logo';

export const Route = createFileRoute('/_user')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-2xl py-12">
      <h1 className="mb-18 text-center">
        <Logo size="6rem" />
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
