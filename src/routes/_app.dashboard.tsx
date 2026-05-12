import { createFileRoute } from '@tanstack/react-router'

import { type Habit } from '#/db/schema'
import { getCurrentUserFn } from '#/utils/users.functions'

import PageTitle from '#/components/PageTitle'
import HabitToDo from '#/components/HabitToDo'
import { getAllHabitsByUserIdFn } from '#/utils/habits.functions'
import { getAllCompletionsOnDateFn } from '#/utils/completions.functions'

interface HabitWithIsDone extends Habit {
  isDone: boolean
}

export const Route = createFileRoute('/_app/dashboard')({
  component: RouteComponent,
  loader: async (): Promise<HabitWithIsDone[]> => {
    const user = await getCurrentUserFn()

    if (!user) return []

    const today = new Date()

    const completions = await getAllCompletionsOnDateFn({
      data: today,
    })
    const completionIds = completions.map((completion) => completion.habitId)

    const allHabits = await getAllHabitsByUserIdFn({ data: user.id })
    const allHabitsWithDone = allHabits.map((habit) => ({
      ...habit,
      isDone: completionIds.includes(habit.id),
    }))

    return allHabitsWithDone
  },
})

function RouteComponent() {
  const { user } = Route.useRouteContext()
  const habits = Route.useLoaderData()

  return (
    <div className="container">
      <PageTitle text={`${user.nickname}'s dashboard`} />

      <div className="grid gap-4">
        {habits.map(({ id, title, isDone }) => (
          <HabitToDo key={id} id={id} title={title} isDone={isDone} />
        ))}
      </div>
    </div>
  )
}
