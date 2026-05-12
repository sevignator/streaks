import { createServerFn } from '@tanstack/react-start';
import type z from 'zod';

import {
  type completionDateSchema,
  type completionSchema,
} from '#/schemas/completions.schemas';
import {
  createCompletionOnDate,
  deleteCompletionOnDate,
  getAllCompletionsFromDate,
} from '#/utils/completions.server';

export const createCompletionOnDateFn = createServerFn({
  method: 'POST',
})
  .inputValidator((input: z.input<typeof completionSchema>) => input)
  .handler(async ({ data: { date, habitId } }) => {
    return await createCompletionOnDate(date, habitId);
  });

export const deleteCompletionOnDateFn = createServerFn({
  method: 'POST',
})
  .inputValidator((input: z.input<typeof completionSchema>) => input)
  .handler(async ({ data: { date, habitId } }) => {
    return await deleteCompletionOnDate(date, habitId);
  });

export const getAllCompletionsOnDateFn = createServerFn({
  method: 'GET',
})
  .inputValidator((input: z.input<typeof completionDateSchema>) => input)
  .handler(async ({ data }) => {
    return await getAllCompletionsFromDate(data);
  });
