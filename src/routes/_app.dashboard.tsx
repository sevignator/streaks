import { createFileRoute } from '@tanstack/react-router';

import { type Completion, type Habit } from '#/db/schema';
import { getCurrentUserFn } from '#/utils/users.functions';
import { getAllHabitsByUserIdFn } from '#/utils/habits.functions';
import { getAllCompletionsByUserIdFn } from '#/utils/completions.functions';
import {
  getCurrentStreak,
  getFormattedDate,
  getLocalISODate,
} from '#/utils/datetime';

import PageTitle from '#/components/PageTitle';
import HabitToDo from '#/components/HabitToDo';

interface CompletionWithHabitData {
  completions: Completion;
  habits: Habit;
}

interface HabitWithIsDone extends Habit {
  isDone: boolean;
}

export const Route = createFileRoute('/_app/dashboard')({
  component: RouteComponent,
  loader: async (): Promise<{
    completions: CompletionWithHabitData[];
    habits: HabitWithIsDone[];
  }> => {
    const user = await getCurrentUserFn();
    const isoDate = getLocalISODate();

    if (!user) {
      return {
        completions: [],
        habits: [],
      };
    }

    const completionsWithHabitsData = await getAllCompletionsByUserIdFn({
      data: { userId: user.id },
    });
    const dailyCompletionIds = completionsWithHabitsData
      .filter((completion) => completion.completions.completedOn === isoDate)
      .map((completion) => completion.completions.habitId);

    const allHabits = await getAllHabitsByUserIdFn({ data: user.id });

    const allHabitsWithDone = allHabits.map((habit) => ({
      ...habit,
      isDone: dailyCompletionIds.includes(habit.id),
    }));

    return {
      completions: completionsWithHabitsData,
      habits: allHabitsWithDone,
    };
  },
});

function RouteComponent() {
  const { completions, habits } = Route.useLoaderData();

  const today = new Date();
  const todayISODate = getLocalISODate(today);
  const todayFormattedDate = getFormattedDate(today);

  const habitsToDo: HabitWithIsDone[] = [];
  const habitsDone: HabitWithIsDone[] = [];

  habits.forEach((habit) => {
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
                streak={getCurrentStreak(
                  relatedCompletions
                    .map((completion) => completion.completions.completedOn)
                    .filter((date): date is string => Boolean(date)),
                  todayISODate,
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
                streak={getCurrentStreak(
                  relatedCompletions
                    .map((completion) => completion.completions.completedOn)
                    .filter((date): date is string => Boolean(date)),
                  todayISODate,
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
