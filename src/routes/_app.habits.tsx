import { createFileRoute, Link } from '@tanstack/react-router';

import PageTitle from '#/components/PageTitle';
import HabitsList from '#/components/HabitsList';

export const Route = createFileRoute('/_app/habits')({
  component: RouteComponent,
});

function RouteComponent() {
  const { habits } = Route.useRouteContext();

  return (
    <div>
      <PageTitle text="Habits" />

      <HabitsList habits={habits} />

      <Link to="/habits/create" className="btn mt-6" data-btn-type="primary">
        Create habit
      </Link>
    </div>
  );
}
