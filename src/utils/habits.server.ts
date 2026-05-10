import { DrizzleQueryError } from 'drizzle-orm'
import { DatabaseError } from 'pg'

import { db } from '#/db'
import { type NewHabit, habits } from '#/db/schema'

export async function createHabit(
  title: NewHabit['title'],
  userId: NewHabit['userId'],
  interval: NewHabit['interval'],
) {
  try {
    await db.insert(habits).values({ title, userId, interval })
  } catch (err) {
    if (
      err instanceof DrizzleQueryError &&
      err.cause instanceof DatabaseError
    ) {
      console.error(err.cause.detail)
    }
  }
}

export async function getAllHabits() {
  return await db.select().from(habits)
}
