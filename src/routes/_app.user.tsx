import { useServerFn } from '@tanstack/react-start';
import { createFileRoute } from '@tanstack/react-router';

import { userLogoutFn } from '#/utils/users.functions';

import PageTitle from '#/components/PageTitle';

export const Route = createFileRoute('/_app/user')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
  const userLogout = useServerFn(userLogoutFn);

  async function handleLogout() {
    await userLogout();
  }

  return (
    <div>
      <PageTitle text={user.nickname} />
      <button onClick={handleLogout} className="btn">
        Logout
      </button>
    </div>
  );
}
