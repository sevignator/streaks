import { redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

import {
  createHabit,
  deleteHabit,
  editHabit,
  getAllHabitsByUserId,
  getHabitByUserId,
} from '#/utils/habits.server';
import { habitIdSchema, userIdSchema } from '#/utils/schemas';

export const createHabitSchema = z.object({
  title: z.string(),
  userId: userIdSchema,
  interval: z.number(),
});

export const createHabitFn = createServerFn({ method: 'POST' })
  .inputValidator((input: z.input<typeof createHabitSchema>) => input)
  .handler(async ({ data }) => {
    const { title, userId, interval } = data;

    await createHabit(title, userId, interval);

    throw redirect({
      to: '/habits',
    });
  });

export const editHabitSchema = z.object({
  habitId: habitIdSchema,
  title: z.string(),
  interval: z.number(),
});

export const editHabitFn = createServerFn({ method: 'POST' })
  .inputValidator((input: z.input<typeof editHabitSchema>) => input)
  .handler(async ({ data }) => {
    const { habitId, title, interval } = data;

    await editHabit(habitId, title, interval);

    throw redirect({
      to: '/habits',
    });
  });

export const deleteHabitFn = createServerFn({ method: 'POST' })
  .inputValidator((input: z.input<typeof habitIdSchema>) => input)
  .handler(async ({ data: habitId }) => {
    await deleteHabit(habitId);

    throw redirect({
      to: '/habits',
    });
  });

export const getHabitByUserIdSchema = z.object({
  habitId: habitIdSchema,
  userId: userIdSchema,
});

export const getHabitByUserIdFn = createServerFn({
  method: 'GET',
})
  .inputValidator((input: z.input<typeof getHabitByUserIdSchema>) => input)
  .handler(async ({ data }) => {
    const { habitId, userId } = data;

    return getHabitByUserId(habitId, userId);
  });

export const getAllHabitsByUserIdFn = createServerFn({ method: 'GET' })
  .inputValidator((input: z.input<typeof userIdSchema>) => input)
  .handler(async ({ data: userId }) => {
    return await getAllHabitsByUserId(userId);
  });
