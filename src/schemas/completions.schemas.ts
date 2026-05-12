import z from 'zod'

import { habitIdSchema } from '#/schemas/habits.schemas'

export const completionDateSchema = z.date()

export const completionSchema = z.object({
  date: completionDateSchema,
  habitId: habitIdSchema,
})
