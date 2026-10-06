import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { type Habit } from "#/db/schema";
import { getTodayISODate, getFormattedDate } from "#/utils/datetime";
import { getCurrentStreakFromCompletions } from "#/utils/streaks";

import HabitToDo from "#/components/HabitToDo";
import PageTitle from "#/components/PageTitle";

interface HabitWithProps extends Habit {
  streak: number;
  isDone: boolean;
}

type CompareFn = (a: HabitWithProps, b: HabitWithProps) => number;

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
  loader: async ({ parentMatchPromise }) => {
    const parentMatch = await parentMatchPromise;

    if (!parentMatch.loaderData) {
      throw notFound();
    }

    const { habits, completions } = parentMatch.loaderData;
    const todayISODate = getTodayISODate();
    const formattedDate = getFormattedDate(todayISODate);

    const dailyCompletionIds = completions
      .filter(
        (completion) => completion.completions.completedOn === todayISODate,
      )
      .map((completion) => completion.completions.habitId);

    const habitsWithProps = habits.map((habit) => {
      // Get and sort completions for this habit.
      const habitCompletions = completions
        .filter((c) => c.completions.habitId === habit.habitId)
        .map((c) => c.completions)
        .toSorted((a, b) => (a.completedOn > b.completedOn ? -1 : 1));

      const streak = getCurrentStreakFromCompletions(
        habitCompletions,
        todayISODate,
      );

      const habitWithProps: HabitWithProps = {
        ...habit,
        streak,
        isDone: dailyCompletionIds.includes(habit.habitId),
      };

      return habitWithProps;
    });

    return {
      habitsWithProps,
      isoDate: todayISODate,
      formattedDate,
    };
  },
});

function RouteComponent() {
  const { habitsWithProps, isoDate, formattedDate } = Route.useLoaderData();

  const [sortedBy, setSortedBy] = useState<SortingOptions>("alpha-asc");
  const [habits, setHabits] = useState(
    habitsWithProps.toSorted(compareFns[sortedBy]),
  );

  useEffect(() => {
    const sortedHabits = [...habits].toSorted(compareFns[sortedBy]);
    setHabits(sortedHabits);
  }, [sortedBy]);

  return (
    <>
      <div className="mb-4 flex flex-wrap justify-between gap-x-8 gap-y-4">
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
            className="ml-2 inline-block cursor-pointer rounded-md border border-[rgb(0_0_0/0.1)] bg-[rgb(0_0_0/0.025)] py-2 pr-10 pl-2 font-medium text-(--clr-accent) dark:border-[rgb(0_0_0/0.5)] dark:bg-[rgb(0_0_0/0.1)]"
          >
            <option value="alpha-asc">Alphabet (ASC)</option>
            <option value="alpha-desc">Alphabet (DESC)</option>
          </select>
        </label>
      </div>

      <h2 className="mb-8 text-lg font-semibold text-slate-400 dark:text-slate-300">
        {formattedDate}
      </h2>

      {habits.length > 0 ? (
        <div className="grid gap-3">
          {habits.map(({ habitId, title, streak, isDone }) => {
            return (
              <HabitToDo
                key={habitId}
                id={habitId}
                title={title}
                initialIsDone={isDone}
                isoDate={isoDate}
                streak={streak}
              />
            );
          })}
        </div>
      ) : (
        <>
          <p>You don't have any habits yet.</p>
          <Link
            to="/habits/create"
            className="btn mt-6"
            data-btn-type="primary"
          >
            Add habit
          </Link>
        </>
      )}
    </>
  );
}
