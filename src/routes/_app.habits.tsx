import { createFileRoute, Link } from '@tanstack/react-router';

import { getAllHabitsByUserIdFn } from '#/utils/habits.functions';
import { getCurrentUserFn } from '#/utils/users.functions';

import PageTitle from '#/components/PageTitle';
import HabitsList from '#/components/HabitsList';

export const Route = createFileRoute('/_app/habits')({
  component: RouteComponent,
  loader: async () => {
    const user = await getCurrentUserFn();

    if (!user) return [];

    return await getAllHabitsByUserIdFn({ data: user.id });
  },
});

function RouteComponent() {
  const habits = Route.useLoaderData();

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
