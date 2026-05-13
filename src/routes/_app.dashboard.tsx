import { createFileRoute } from "@tanstack/react-router";

import { type Habit } from "#/db/schema";
import { getCurrentUserFn } from "#/utils/users.functions";
import { getAllHabitsByUserIdFn } from "#/utils/habits.functions";
import { getAllCompletionsOnFn } from "#/utils/completions.functions";
import { getISODate } from "#/utils/datetime";

import PageTitle from "#/components/PageTitle";
import HabitToDo from "#/components/HabitToDo";

interface HabitWithIsDone extends Habit {
  isDone: boolean;
}

export const Route = createFileRoute("/_app/dashboard")({
  component: RouteComponent,
  loader: async (): Promise<{
    habits: HabitWithIsDone[];
    now: Date;
  }> => {
    const user = await getCurrentUserFn();
    const now = new Date();
    const dateInISO = getISODate(now);

    if (!user)
      return {
        habits: [],
        now,
      };

    const completions = await getAllCompletionsOnFn({
      data: { date: dateInISO },
    });
    const completionIds = completions.map((completion) => completion.habitId);

    const allHabits = await getAllHabitsByUserIdFn({ data: user.id });
    const allHabitsWithDone = allHabits.map((habit) => ({
      ...habit,
      isDone: completionIds.includes(habit.id),
    }));

    return {
      habits: allHabitsWithDone,
      now,
    };
  },
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
  const { habits, now } = Route.useLoaderData();

  return (
    <div className="container">
      <PageTitle text={`${user.nickname}'s dashboard`} />

      <p>Server time: {now.toISOString()}</p>

      <p>Client time: {new Date().toString()}</p>

      <div className="grid gap-4">
        {habits.map(({ id, title, isDone }) => (
          <HabitToDo key={id} id={id} title={title} isDone={isDone} />
        ))}
      </div>
    </div>
  );
}
