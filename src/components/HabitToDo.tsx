import React from "react";
import { useServerFn } from "@tanstack/react-start";

import {
  createCompletionOnFn,
  deleteCompletionOnFn,
} from "#/utils/completions.functions";
import { type Habit } from "#/db/schema";
import { getISODate } from "#/utils/datetime";

interface HabitToDoProps {
  id: Habit["id"];
  title: Habit["title"];
  isDone?: boolean;
}

export default function HabitToDo({
  id,
  title,
  isDone = false,
}: HabitToDoProps) {
  const createCompletionOnDate = useServerFn(createCompletionOnFn);
  const deleteCompletionOnDate = useServerFn(deleteCompletionOnFn);
  const [isChecked, setIsChecked] = React.useState(isDone);

  async function toggleCheck() {
    const nextIsChecked = !isChecked;
    setIsChecked(nextIsChecked);

    const now = new Date();
    const isoDate = getISODate(now);

    if (nextIsChecked) {
      createCompletionOnDate({ data: { date: isoDate, habitId: id } });
    } else {
      deleteCompletionOnDate({ data: { date: isoDate, habitId: id } });
    }
  }

  return (
    <button
      onClick={toggleCheck}
      className={`
        flex
        items-center
        gap-3
        rounded-lg
        border
        p-3
        text-xl
        transition
        ${isChecked ? "bg-green-100" : "bg-violet-100"}
        ${isChecked ? "border-green-400" : "border-violet-200"}
        ${isChecked ? "text-green-950" : "text-violet-950"}
        hover:scale-[1.015]
        hover:cursor-pointer
        active:scale-[1.01]
      `}
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
          className={`
            block
            aspect-square
            transition-colors
            ${isChecked ? "stroke-green-500" : "stroke-violet-300"}
          `}
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            className={`
              transition-[stroke-dasharray]
              ${isChecked ? "[stroke-dasharray:0,0]" : "[stroke-dasharray:2,4]"}
              ${isChecked ? "fill-green-50" : "fill-violet-50"}
            `}
          />
          <path
            d="m9 12 2 2 4-4"
            pathLength={10}
            className={`
              transition-[stroke-dashoffset]
              [stroke-dasharray:10,10]
              ${isChecked ? "[stroke-dashoffset:0]" : "[stroke-dashoffset:10]"}
            `}
          />
        </svg>
      </span>

      {title}
    </button>
  );
}
