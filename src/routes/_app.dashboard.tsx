import { createFileRoute } from "@tanstack/react-router";

import { type Completion, type Habit } from "#/db/schema";
import { getCurrentUserFn } from "#/utils/users.functions";
import { getAllHabitsByUserIdFn } from "#/utils/habits.functions";
import { getAllCompletionsByUserIdFn } from "#/utils/completions.functions";
import { getLocalTime } from "#/utils/datetime";

import PageTitle from "#/components/PageTitle";
import HabitToDo from "#/components/HabitToDo";

interface CompletionWithHabitData {
  completions: Completion;
  habits: Habit;
}

interface HabitWithIsDone extends Habit {
  isDone: boolean;
}

export const Route = createFileRoute("/_app/dashboard")({
  component: RouteComponent,
  loader: async (): Promise<{
    completions: CompletionWithHabitData[];
    habits: HabitWithIsDone[];
  }> => {
    const user = await getCurrentUserFn();
    const isoDate = getLocalTime();

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

  return (
    <div>
      <PageTitle text="Dashboard" />

      <h2 className="mb-4 text-lg font-bold uppercase">Your day</h2>

      <div className="grid gap-4">
        {habits.map(({ id, title, isDone }) => {
          const relatedCompletions = completions.filter((completion) => {
            return completion.habits.id === id;
          });

          return (
            <HabitToDo
              key={id}
              id={id}
              title={title}
              isDone={isDone}
              count={relatedCompletions.length}
            />
          );
        })}
      </div>
    </div>
  );
}
