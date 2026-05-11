import z from 'zod'

export const habitIdSchema = z.number()
export const completedHabitDateSchema = z.date()

export const deleteCompletedHabitFromDateSchma = z.object({
  date: completedHabitDateSchema,
  habitId: habitIdSchema,
})
