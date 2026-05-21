import { createFileRoute } from "@tanstack/react-router";

import { type Habit } from "#/db/schema";
import {
  getCurrentStreak,
  getFormattedDate,
  getISODateWithTimezone,
} from "#/utils/datetime";

import HabitToDo from "#/components/HabitToDo";
import PageTitle from "#/components/PageTitle";

interface HabitWithIsDone extends Habit {
  isDone: boolean;
}

export const Route = createFileRoute("/_app/dashboard")({
  component: RouteComponent,
  loader: ({
    context,
  }): {
    serverTime: Date;
    habitsWithIsDone: HabitWithIsDone[];
  } => {
    const { user, habits, completions } = context;
    const today = new Date();
    const isoDate = getISODateWithTimezone(today, user.timeZone);

    const dailyCompletionIds = completions
      .filter((completion) => completion.completions.completedOn === isoDate)
      .map((completion) => completion.completions.habitId);

    const habitsWithIsDone = habits.map((habit) => ({
      ...habit,
      isDone: dailyCompletionIds.includes(habit.id),
    }));

    return {
      serverTime: today,
      habitsWithIsDone,
    };
  },
});

function RouteComponent() {
  const { user, completions } = Route.useRouteContext();
  const { serverTime, habitsWithIsDone } = Route.useLoaderData();

  const today = new Date();
  const todayISODate = getISODateWithTimezone(today, user.timeZone);
  const todayFormattedDate = getFormattedDate(today);

  const habitsToDo: HabitWithIsDone[] = [];
  const habitsDone: HabitWithIsDone[] = [];

  habitsWithIsDone.forEach((habit) => {
    if (habit.isDone) {
      habitsDone.push(habit);
    } else {
      habitsToDo.push(habit);
    }
  });

  return (
    <div>
      <PageTitle text="Dashboard" />

      <h2 className="mb-9 text-lg font-semibold text-slate-400 dark:text-slate-300">
        {todayFormattedDate}
      </h2>

      <p>Server time: {serverTime.toString()}</p>
      <p>Client time: {today.toString()}</p>

      <h3 className="font-regular mb-2 text-lg text-violet-600 uppercase dark:text-violet-300">
        To do
      </h3>

      {habitsToDo.length > 0 ? (
        <div className="grid gap-3">
          {habitsToDo.map(({ id, title, isDone }) => {
            const relatedCompletions = completions.filter((completion) => {
              return completion.habits.id === id;
            });

            return (
              <HabitToDo
                key={id}
                id={id}
                title={title}
                isDone={isDone}
                isoDate={todayISODate}
                streak={getCurrentStreak(
                  relatedCompletions
                    .map((completion) => completion.completions.completedOn)
                    .filter((date): date is string => Boolean(date)),
                  todayISODate,
                  user.timeZone,
                )}
              />
            );
          })}
        </div>
      ) : (
        <p>You're all done for today!</p>
      )}

      <h3 className="font-regular mt-8 mb-2 text-lg text-violet-600 uppercase dark:text-violet-300">
        Done
      </h3>

      {habitsDone.length > 0 ? (
        <div className="grid gap-3">
          {habitsDone.map(({ id, title, isDone }) => {
            const relatedCompletions = completions.filter((completion) => {
              return completion.habits.id === id;
            });

            return (
              <HabitToDo
                key={id}
                id={id}
                title={title}
                isDone={isDone}
                isoDate={todayISODate}
                streak={getCurrentStreak(
                  relatedCompletions
                    .map((completion) => completion.completions.completedOn)
                    .filter((date): date is string => Boolean(date)),
                  todayISODate,
                  user.timeZone,
                )}
              />
            );
          })}
        </div>
      ) : (
        <p>Better get started!</p>
      )}
    </div>
  );
}
