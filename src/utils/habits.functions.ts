import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { createHabit, getAllHabitsByUserId } from "#/utils/habits.server";
import { userIdSchema } from "#/utils/schemas";

export const createHabitSchema = z.object({
  title: z.string(),
  userId: userIdSchema,
  interval: z.number(),
});

export const createHabitFn = createServerFn({ method: "POST" })
  .inputValidator((input: z.input<typeof createHabitSchema>) => input)
  .handler(async ({ data }) => {
    const { title, userId, interval } = data;

    await createHabit(title, userId, interval);

    throw redirect({
      to: "/habits",
    });
  });

export const getAllHabitsByUserIdFn = createServerFn({ method: "GET" })
  .inputValidator((input: z.input<typeof userIdSchema>) => input)
  .handler(async ({ data: userId }) => {
    return await getAllHabitsByUserId(userId);
  });
