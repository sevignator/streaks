import { DatabaseError } from "pg";
import { and, DrizzleQueryError, eq } from "drizzle-orm";

import { db } from "#/db";
import { type Habit, type NewHabit, type User, habits } from "#/db/schema";

export async function createHabit(
  title: NewHabit["title"],
  userId: NewHabit["userId"],
  interval: NewHabit["interval"],
) {
  try {
    await db.insert(habits).values({ title, userId, interval });
  } catch (err) {
    if (
      err instanceof DrizzleQueryError &&
      err.cause instanceof DatabaseError
    ) {
      console.error(err.cause.detail);
    }
  }
}

export async function editHabit(
  habitId: Habit["id"],
  title: Habit["title"],
  interval: Habit["interval"],
) {
  try {
    await db
      .update(habits)
      .set({ title, interval })
      .where(eq(habits.id, habitId));
  } catch (err) {
    if (
      err instanceof DrizzleQueryError &&
      err.cause instanceof DatabaseError
    ) {
      console.error(err.cause.detail);
    }
  }
}

export async function getHabitByUserId(
  habitId: Habit["id"],
  userId: User["id"],
) {
  const matches = await db
    .select()
    .from(habits)
    .where(and(eq(habits.id, habitId), eq(habits.userId, userId)));

  return matches[0];
}

export async function getAllHabitsByUserId(userId: User["id"]) {
  return await db.select().from(habits).where(eq(habits.userId, userId));
}
