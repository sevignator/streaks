import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import z from 'zod'

import {
  createCompletedHabitOnDate,
  createHabit,
  deleteCompletedHabitFromDate,
  getAllCompletedHabitsFromDate,
  getAllHabitsByUserId,
} from '#/utils/habits.server'
import { createHabitSchema, userIdSchema } from '#/utils/schemas'
import {
  completedHabitDateSchema,
  deleteCompletedHabitFromDateSchma,
} from '#/utils/habits.schemas'

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
  .inputValidator(
    (input: z.input<typeof deleteCompletedHabitFromDateSchma>) => input,
  )
  .handler(async ({ data: { date, habitId } }) => {
    return await createCompletedHabitOnDate(date, habitId)
  })

export const deleteCompletedHabitFn = createServerFn({
  method: 'POST',
})
  .inputValidator(
    (input: z.input<typeof deleteCompletedHabitFromDateSchma>) => input,
  )
  .handler(async ({ data: { date, habitId } }) => {
    return await deleteCompletedHabitFromDate(date, habitId)
  })

export const getAllCompletedHabitsFromDateFn = createServerFn({
  method: 'GET',
})
  .inputValidator((input: z.input<typeof completedHabitDateSchema>) => input)
  .handler(async ({ data: date }) => {
    return await getAllCompletedHabitsFromDate(date)
  })
