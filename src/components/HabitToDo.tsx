import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import clsx from "clsx";

import { type Habit } from "#/db/schema";
import {
  createCompletionOnFn,
  deleteCompletionOnFn,
} from "#/utils/completions.functions";
import { getLocalTime } from "#/utils/datetime";

interface HabitToDoProps {
  id: Habit["id"];
  title: Habit["title"];
  isDone?: boolean;
  count?: number;
}

export default function HabitToDo({
  id,
  title,
  isDone = false,
  count = 0,
}: HabitToDoProps) {
  const createCompletionOnDate = useServerFn(createCompletionOnFn);
  const deleteCompletionOnDate = useServerFn(deleteCompletionOnFn);
  const [isChecked, setIsChecked] = useState(isDone);

  async function toggleCheck() {
    const nextIsChecked = !isChecked;
    setIsChecked(nextIsChecked);

    const isoDate = getLocalTime();

    if (nextIsChecked) {
      createCompletionOnDate({ data: { date: isoDate, habitId: id } });
    } else {
      deleteCompletionOnDate({ data: { date: isoDate, habitId: id } });
    }
  }

  return (
    <button
      onClick={toggleCheck}
      className={clsx(
        "flex items-center gap-3 rounded-lg border p-3 text-xl transition hover:scale-[1.015] hover:cursor-pointer active:scale-[1.01]",
        isChecked
          ? "border-green-400 bg-green-100 text-green-950"
          : "border-violet-200 bg-violet-100 text-violet-950 dark:border-slate-900 dark:bg-slate-700 dark:text-slate-300",
      )}
    >
      <span>
        <svg
          width="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={clsx(
            "block aspect-square transition-colors",
            isChecked
              ? "stroke-green-500"
              : "stroke-violet-300 dark:stroke-slate-800",
          )}
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            className={clsx(
              "transition-[stroke-dasharray]",
              isChecked
                ? "fill-green-50 [stroke-dasharray:0,0]"
                : "fill-violet-50 [stroke-dasharray:2,4] dark:fill-slate-600",
            )}
          />
          <path
            d="m9 12 2 2 4-4"
            pathLength={10}
            className={clsx(
              "transition-[stroke-dashoffset] [stroke-dasharray:10,10]",
              isChecked ? "[stroke-dashoffset:0]" : "[stroke-dashoffset:10]",
            )}
          />
        </svg>
      </span>

      {title}

      <div className="ml-auto">
        <div className="text-xs">Completed</div>
        <div className="text-[1.25rem]">
          {(isChecked ? 1 : 0) + count} {count === 1 ? "time" : "times"}
        </div>
      </div>
    </button>
  );
}
