import { createServerFn } from "@tanstack/react-start";
import z from "zod";

import { habitIdSchema } from "#/schemas/habits.schemas";
import { dateISOSchema } from "#/schemas/datetime.schemas";
import {
  createCompletionOn,
  deleteCompletionOn,
  getAllCompletionsOn,
} from "#/utils/completions.server";

const createCompletionOnSchema = z.object({
  date: dateISOSchema,
  habitId: habitIdSchema,
});

export const createCompletionOnFn = createServerFn({
  method: "POST",
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
  method: "POST",
})
  .inputValidator((input: z.input<typeof deleteCompletionOnSchema>) => input)
  .handler(async ({ data: { date, habitId } }) => {
    return await deleteCompletionOn(date, habitId);
  });

const getAllCompletionsOnSchema = z.object({
  date: dateISOSchema,
});

export const getAllCompletionsOnFn = createServerFn({
  method: "GET",
})
  .inputValidator((input: z.input<typeof getAllCompletionsOnSchema>) => input)
  .handler(async ({ data: { date } }) => {
    return await getAllCompletionsOn(date);
  });
