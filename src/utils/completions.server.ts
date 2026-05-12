import { and, eq, sql } from 'drizzle-orm'

import { db } from '#/db'
import { completions, type Habit } from '#/db/schema'
import { getISODate } from '#/utils/datetime'

export async function createCompletionOnDate(date: Date, habitId: Habit['id']) {
  const dateInISO = getISODate(date)
  await db.insert(completions).values({ habitId, completedOn: dateInISO })
}

export async function deleteCompletionOnDate(date: Date, habitId: Habit['id']) {
  const dateInISO = getISODate(date)
  await db
    .delete(completions)
    .where(
      and(
        eq(completions.habitId, habitId),
        eq(sql`DATE(${completions.completedOn} AT TIME ZONE 'UTC')`, dateInISO),
      ),
    )
}

export async function getAllCompletionsFromDate(date: Date) {
  const dateInISO = getISODate(date)
  return await db
    .select()
    .from(completions)
    .where(
      eq(sql`DATE(${completions.completedOn} AT TIME ZONE 'UTC')`, dateInISO),
    )
}
