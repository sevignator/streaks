import { createFileRoute } from "@tanstack/react-router";

import { type Habit } from "#/db/schema";
import {
  getCurrentStreak,
  getFormattedDate,
  getISODateWithTimezone,
} from "#/utils/datetime";

import HabitToDo from "#/components/HabitToDo";
import PageTitle from "#/components/PageTitle";
import { useEffect, useState } from "react";

interface HabitWithIsDone extends Habit {
  isDone: boolean;
}

type CompareFn = (a: HabitWithIsDone, b: HabitWithIsDone) => number;

const compareFns = {
  "alpha-asc": (a, b) => (a.title < b.title ? -1 : 1),
  "alpha-desc": (a, b) => (a.title > b.title ? -1 : 1),
} satisfies Record<string, CompareFn>;

type SortingOptions = keyof typeof compareFns;

function isSortingOption(text: string): text is SortingOptions {
  return Object.hasOwn(compareFns, text);
}

export const Route = createFileRoute("/_app/dashboard")({
  component: RouteComponent,
  loader: ({
    context,
  }): {
    habitsWithIsDone: HabitWithIsDone[];
    isoDate: string;
    formattedDate: string;
  } => {
    const { user, habits, completions } = context;
    const today = new Date();
    const isoDate = getISODateWithTimezone(today, user.timeZone);
    const formattedDate = getFormattedDate(today);

    const dailyCompletionIds = completions
      .filter((completion) => completion.completions.completedOn === isoDate)
      .map((completion) => completion.completions.habitId);

    const habitsWithIsDone = habits.map((habit) => ({
      ...habit,
      isDone: dailyCompletionIds.includes(habit.id),
    }));

    return {
      habitsWithIsDone,
      isoDate,
      formattedDate,
    };
  },
});

function RouteComponent() {
  const { user, completions } = Route.useRouteContext();
  const { habitsWithIsDone, isoDate, formattedDate } = Route.useLoaderData();

  const [sortedBy, setSortedBy] = useState<SortingOptions>("alpha-asc");
  const [habits, setHabits] = useState(
    habitsWithIsDone.toSorted(compareFns[sortedBy]),
  );

  useEffect(() => {
    console.log("Changing");
  }, [habits]);

  useEffect(() => {
    const sortedHabits = [...habits].toSorted(compareFns[sortedBy]);
    setHabits(sortedHabits);
  }, [sortedBy]);

  return (
    <div>
      <div className="flex gap-8 flex-wrap justify-between">
        <PageTitle text="Dashboard" />

        <label htmlFor="todos-sort">
          Sorted by
          <select
            name="todos-sort"
            id="todos-sort"
            value={sortedBy}
            onChange={(e) => {
              const { value } = e.target;
              if (!isSortingOption(value)) return;
              setSortedBy(value);
            }}
            className="inline-block border ml-2 pl-2 pr-10 py-2 rounded-md bg-transparent border-slate-200 dark:border-slate-950 text-(--clr-accent)"
          >
            <option value="alpha-asc">Alphabet (ASC)</option>
            <option value="alpha-desc">Alphabet (DESC)</option>
          </select>
        </label>
      </div>

      <h2 className="mb-9 text-lg font-semibold text-slate-400 dark:text-slate-300">
        {formattedDate}
      </h2>

      {habits.length > 0 ? (
        <div className="grid gap-3">
          {habits.map(({ id, title, isDone }) => {
            const relatedCompletions = completions.filter((completion) => {
              return completion.habits.id === id;
            });

            return (
              <HabitToDo
                key={id}
                id={id}
                title={title}
                initialIsDone={isDone}
                isoDate={isoDate}
                streak={getCurrentStreak(
                  relatedCompletions
                    .map((completion) => completion.completions.completedOn)
                    .filter((date): date is string => Boolean(date)),
                  isoDate,
                  user.timeZone,
                )}
              />
            );
          })}
        </div>
      ) : (
        <p>You don't have any habits yet.</p>
      )}
    </div>
  );
}
