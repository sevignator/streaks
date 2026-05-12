import { redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { type z } from 'zod';

import { createHabit, getAllHabitsByUserId } from '#/utils/habits.server';
import { type createHabitSchema } from '#/schemas/inputs.schemas';
import { type userIdSchema } from '#/schemas/users.schemas';

export const createHabitFn = createServerFn({ method: 'POST' })
  .inputValidator((input: z.input<typeof createHabitSchema>) => input)
  .handler(async ({ data }) => {
    const { title, userId, interval } = data;

    await createHabit(title, userId, interval);

    throw redirect({
      to: '/habits',
    });
  });

export const getAllHabitsByUserIdFn = createServerFn({ method: 'GET' })
  .inputValidator((input: z.input<typeof userIdSchema>) => input)
  .handler(async ({ data: userId }) => {
    return await getAllHabitsByUserId(userId);
  });
