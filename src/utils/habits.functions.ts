import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import z from 'zod'

import {
  createCompletedHabit,
  createHabit,
  deleteCompletedHabit,
  getAllCompletedHabitsFromDate,
  getAllHabitsByUserId,
} from '#/utils/habits.server'
import { createHabitSchema, habitIdSchema, userIdSchema } from '#/utils/schemas'
import { CompletedHabitDateSchema } from '#/utils/habits.schemas'

export const createHabitFn = createServerFn({ method: 'POST' })
  .inputValidator((input: z.input<typeof createHabitSchema>) => input)
  .handler(async ({ data }) => {
    const { title, userId, interval } = data

    await createHabit(title, userId, interval)

    throw redirect({
      to: '/habits',
    })
  })

export const getAllHabitsByUserIdFn = createServerFn({ method: 'GET' })
  .inputValidator((input: z.input<typeof userIdSchema>) => input)
  .handler(async ({ data: userId }) => {
    return await getAllHabitsByUserId(userId)
  })

export const createCompletedHabitFn = createServerFn({
  method: 'POST',
})
  .inputValidator((input: z.input<typeof habitIdSchema>) => input)
  .handler(async ({ data: habitId }) => {
    return await createCompletedHabit(habitId)
  })

export const deleteCompletedHabitFn = createServerFn({
  method: 'POST',
})
  .inputValidator((input: z.input<typeof habitIdSchema>) => input)
  .handler(async ({ data: habitId }) => {
    return await deleteCompletedHabit(habitId)
  })

export const getAllCompletedHabitsFromDateFn = createServerFn({
  method: 'GET',
})
  .inputValidator((input: z.input<typeof CompletedHabitDateSchema>) => input)
  .handler(async ({ data: date }) => {
    return await getAllCompletedHabitsFromDate(date)
  })
