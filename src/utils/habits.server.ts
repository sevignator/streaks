import { and, DrizzleQueryError, eq, sql } from 'drizzle-orm'
import { DatabaseError } from 'pg'

import { db } from '#/db'
import {
  type Habit,
  type NewHabit,
  type User,
  completedHabits,
  habits,
} from '#/db/schema'
import { getISODate } from './datetime'

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

export async function getAllHabitsByUserId(userId: User['id']) {
  return await db.select().from(habits).where(eq(habits.userId, userId))
}

export async function createCompletedHabitOnDate(
  date: Date,
  habitId: Habit['id'],
) {
  await db.insert(completedHabits).values({ habitId, completedAt: date })
}

export async function deleteCompletedHabitFromDate(
  date: Date,
  habitId: Habit['id'],
) {
  const dateInISO = getISODate(date)

  await db
    .delete(completedHabits)
    .where(
      and(
        eq(completedHabits.habitId, habitId),
        eq(
          sql`DATE(${completedHabits.completedAt} AT TIME ZONE 'UTC')`,
          dateInISO,
        ),
      ),
    )
}

export async function getAllCompletedHabitsFromDate(date: Date) {
  const dateInISO = getISODate(date)

  return await db
    .select()
    .from(completedHabits)
    .where(
      eq(
        sql`DATE(${completedHabits.completedAt} AT TIME ZONE 'UTC')`,
        dateInISO,
      ),
    )
}
