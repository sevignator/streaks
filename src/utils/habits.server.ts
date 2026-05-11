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

export async function createCompletedHabit(habitId: Habit['id']) {
  await db.insert(completedHabits).values({ habitId })
}

export async function deleteCompletedHabit(habitId: Habit['id']) {
  const today = new Date().toISOString().split('T')[0]

  await db
    .delete(completedHabits)
    .where(
      and(
        eq(completedHabits.habitId, habitId),
        eq(sql`DATE(${completedHabits.completedAt} AT TIME ZONE 'UTC')`, today),
      ),
    )
}

export async function getAllCompletedHabitsFromDate(date: Date) {
  const today = date.toISOString().split('T')[0]

  return await db
    .select()
    .from(completedHabits)
    .where(
      eq(sql`DATE(${completedHabits.completedAt} AT TIME ZONE 'UTC')`, today),
    )
}
