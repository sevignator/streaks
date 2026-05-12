import React from 'react';

import {
  createCompletionOnDateFn,
  deleteCompletionOnDateFn,
} from '#/utils/completions.functions';
import { getServerDateFn } from '#/utils/datetime.function';
import { type Habit } from '#/db/schema';
import { useServerFn } from '@tanstack/react-start';

interface HabitToDoProps {
  id: Habit['id'];
  title: Habit['title'];
  isDone?: boolean;
}

export default function HabitToDo({
  id,
  title,
  isDone = false,
}: HabitToDoProps) {
  const createCompletionOnDate = useServerFn(createCompletionOnDateFn);
  const deleteCompletionOnDate = useServerFn(deleteCompletionOnDateFn);
  const getServerDate = useServerFn(getServerDateFn);
  const [isChecked, setIsChecked] = React.useState(isDone);

  async function toggleCheck() {
    const nextIsChecked = !isChecked;
    setIsChecked(nextIsChecked);

    const now = await getServerDate();

    if (nextIsChecked) {
      createCompletionOnDate({ data: { date: now, habitId: id } });
    } else {
      deleteCompletionOnDate({ data: { date: now, habitId: id } });
    }
  }

  return (
    <button
      onClick={toggleCheck}
      className={`
        flex
        p-3
        gap-3
        text-xl
        items-center
        rounded-lg
        border
        transition
        ${isChecked ? 'bg-green-100' : 'bg-violet-100'}
        ${isChecked ? 'border-green-400' : 'border-violet-200'}
        ${isChecked ? 'text-green-950' : 'text-violet-950'}
        hover:cursor-pointer
        hover:scale-[1.015]
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
            ${isChecked ? 'stroke-green-500' : 'stroke-violet-300'}
          `}
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            className={`
              transition-[stroke-dasharray]
              ${isChecked ? '[stroke-dasharray:0,0]' : '[stroke-dasharray:2,4]'}
              ${isChecked ? 'fill-green-50' : 'fill-violet-50'}
            `}
          />
          <path
            d="m9 12 2 2 4-4"
            pathLength={10}
            className={`
              transition-[stroke-dashoffset]
              [stroke-dasharray:10,10]
              ${isChecked ? '[stroke-dashoffset:0]' : '[stroke-dashoffset:10]'}
            `}
          />
        </svg>
      </span>

      {title}
    </button>
  );
}
