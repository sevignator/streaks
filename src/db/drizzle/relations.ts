import { relations } from "drizzle-orm/relations";
import { users, habits, completedHabits } from "./schema";

export const habitsRelations = relations(habits, ({one, many}) => ({
	user: one(users, {
		fields: [habits.userId],
		references: [users.id]
	}),
	completedHabits: many(completedHabits),
}));

export const usersRelations = relations(users, ({many}) => ({
	habits: many(habits),
}));

export const completedHabitsRelations = relations(completedHabits, ({one}) => ({
	habit: one(habits, {
		fields: [completedHabits.habitId],
		references: [habits.id]
	}),
}));