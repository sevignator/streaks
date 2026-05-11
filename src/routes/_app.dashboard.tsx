import { createFileRoute } from '@tanstack/react-router'

import { type Habit } from '#/db/schema'
import { getCurrentUserFn } from '#/utils/users.functions'

import PageTitle from '#/components/PageTitle'
import HabitToDo from '#/components/HabitToDo'
import {
  getAllCompletedHabitsFromDateFn,
  getAllHabitsByUserIdFn,
} from '#/utils/habits.functions'

interface HabitWithIsDone extends Habit {
  isDone: boolean
}

export const Route = createFileRoute('/_app/dashboard')({
  component: RouteComponent,
  loader: async (): Promise<HabitWithIsDone[]> => {
    const user = await getCurrentUserFn()

    if (!user) return []

    const now = new Date()

    const completedHabits = await getAllCompletedHabitsFromDateFn({ data: now })
    const completedHabitIds = completedHabits.map(
      (completion) => completion.habitId,
    )

    console.log(completedHabitIds)

    const allHabits = await getAllHabitsByUserIdFn({ data: user.id })
    const allHabitsWithDone = allHabits.map((habit) => ({
      ...habit,
      isDone: completedHabitIds.includes(habit.id),
    }))

    console.log(allHabitsWithDone)

    return allHabitsWithDone
  },
})

function RouteComponent() {
  const { user } = Route.useRouteContext()
  const habits = Route.useLoaderData()

  return (
    <div className="container">
      <PageTitle text={`${user.nickname}'s dashboard`} />

      {habits.map(({ id, title, isDone }) => (
        <HabitToDo key={id} id={id} title={title} isDone={isDone} />
      ))}
    </div>
  )
}
