import { and, eq } from "drizzle-orm";

import { db } from "#/db";
import { completions, type Habit } from "#/db/schema";

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

export async function getAllCompletionsOn(dateInISO: string) {
  return await db
    .select()
    .from(completions)
    .where(eq(completions.completedOn, dateInISO));
}
