import { createServerFn } from '@tanstack/react-start';
import z from 'zod';

import { dateISOSchema, habitIdSchema, userIdSchema } from '#/utils/schemas';
import {
  createCompletionOn,
  deleteCompletionOn,
  getAllCompletionsByHabitId,
  getAllCompletionsByUserId,
} from '#/utils/completions.server';

const createCompletionOnSchema = z.object({
  date: dateISOSchema,
  habitId: habitIdSchema,
});

export const createCompletionOnFn = createServerFn({
  method: 'POST',
})
  .inputValidator((input: z.input<typeof createCompletionOnSchema>) => input)
  .handler(async ({ data: { date, habitId } }) => {
    return await createCompletionOn(date, habitId);
  });

const deleteCompletionOnSchema = z.object({
  date: dateISOSchema,
  habitId: habitIdSchema,
});

export const deleteCompletionOnFn = createServerFn({
  method: 'POST',
})
  .inputValidator((input: z.input<typeof deleteCompletionOnSchema>) => input)
  .handler(async ({ data: { date, habitId } }) => {
    return await deleteCompletionOn(date, habitId);
  });

const getAllCompletionsByUserIdSchema = z.object({
  userId: userIdSchema,
});

export const getAllCompletionsByUserIdFn = createServerFn({
  method: 'GET',
})
  .inputValidator(
    (input: z.input<typeof getAllCompletionsByUserIdSchema>) => input,
  )
  .handler(async ({ data: { userId } }) => {
    return await getAllCompletionsByUserId(userId);
  });

const getAllCompletionsByHabitSchema = z.object({
  habitId: habitIdSchema,
});

export const getAllCompletionsByHabitIdFn = createServerFn({
  method: 'GET',
})
  .inputValidator(
    (input: z.input<typeof getAllCompletionsByHabitSchema>) => input,
  )
  .handler(async ({ data: { habitId } }) => {
    return await getAllCompletionsByHabitId(habitId);
  });
