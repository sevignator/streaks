import { and, eq } from "drizzle-orm";

import { db } from "#/db";
import { completions, habits, type Habit, type User } from "#/db/schema";

export async function createCompletionOn(
  dateInISO: string,
  habitId: Habit["habitId"],
) {
  await db.insert(completions).values({ habitId, completedOn: dateInISO });
}

export async function deleteCompletionOn(
  dateInISO: string,
  habitId: Habit["habitId"],
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

export async function getAllCompletionsByUserId(userId: User["userId"]) {
  return await db
    .select()
    .from(completions)
    .innerJoin(habits, eq(completions.habitId, habits.habitId))
    .where(eq(habits.userId, userId));
}

export async function getAllCompletionsByHabitId(habitId: Habit["habitId"]) {
  return await db
    .select()
    .from(completions)
    .where(eq(completions.habitId, habitId));
}
