import { createFileRoute, Link } from '@tanstack/react-router';

import { appRoute } from '#/utils/routeApis';

import PageTitle from '#/components/PageTitle';
import HabitsList from '#/components/HabitsList';

export const Route = createFileRoute('/_app/habits')({
  component: RouteComponent,
});

function RouteComponent() {
  const { habits } = appRoute.useLoaderData();

  return (
    <div>
      <PageTitle text="Habits" className="mb-8" />

      <HabitsList habits={habits} />

      <Link to="/habits/create" className="btn mt-6" data-btn-type="primary">
        Create habit
      </Link>
    </div>
  );
}
