import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import type z from 'zod'

import { createHabit, getAllHabits } from '#/utils/habits.server'
import { createHabitSchema } from '#/utils/schemas'

export const createHabitFn = createServerFn({ method: 'POST' })
  .inputValidator((input: z.input<typeof createHabitSchema>) => input)
  .handler(async ({ data }) => {
    const { title, userId, interval } = data

    await createHabit(title, userId, interval)

    throw redirect({
      to: '/habits',
    })
  })

export const getAllHabitsFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const habits = await getAllHabits()

    return habits
  },
)
