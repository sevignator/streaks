import { and, eq } from "drizzle-orm";

import { db } from "#/db";
import { completions, habits, type Habit, type User } from "#/db/schema";

export async function createCompletionOn(
  dateInISO: string,
  habitId: Habit["id"],
) {
  await db.insert(completions).values({ habitId, completedOn: dateInISO });
}

export async function deleteCompletionOn(
  dateInISO: string,
  habitId: Habit["id"],
) {
  await db
    .delete(completions)
    .where(
      and(
        eq(completions.habitId, habitId),
        eq(completions.completedOn, dateInISO),
      ),
    );
}

export async function getAllCompletionsByUserId(userId: User["id"]) {
  return await db
    .select()
    .from(completions)
    .innerJoin(habits, eq(completions.habitId, habits.id))
    .where(eq(habits.userId, userId));
}

export async function getAllCompletionsByHabitId(habitId: Habit["id"]) {
  return await db
    .select()
    .from(completions)
    .where(eq(completions.habitId, habitId));
}
