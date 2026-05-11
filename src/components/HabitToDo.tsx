import React from 'react'

import {
  createCompletedHabitFn,
  deleteCompletedHabitFn,
} from '#/utils/habits.functions'
import { type Habit } from '#/db/schema'
import { useServerFn } from '@tanstack/react-start'

interface HabitToDoProps {
  id: Habit['id']
  title: Habit['title']
  isDone?: boolean
}

export default function HabitToDo({
  id,
  title,
  isDone = false,
}: HabitToDoProps) {
  const createCompletedHabit = useServerFn(createCompletedHabitFn)
  const deleteCompletedHabit = useServerFn(deleteCompletedHabitFn)
  const [isChecked, setIsChecked] = React.useState(isDone)

  async function toggleCheck() {
    const nextIsChecked = !isChecked
    setIsChecked(nextIsChecked)

    const now = new Date()

    if (nextIsChecked) {
      createCompletedHabit({ data: { date: now, habitId: id } })
    } else {
      deleteCompletedHabit({ data: { date: now, habitId: id } })
    }
  }

  return (
    <button onClick={toggleCheck} className="flex">
      <span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="max-w-4"
        >
          <circle cx="12" cy="12" r="10" />
          {isChecked && <path d="m9 12 2 2 4-4" />}
        </svg>
      </span>

      {title}
    </button>
  )
}
