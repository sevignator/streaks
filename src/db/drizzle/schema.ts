import { pgTable, foreignKey, serial, text, boolean, timestamp, varchar } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const habits = pgTable("habits", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	isActive: boolean("is_active").default(true).notNull(),
	userId: serial("user_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "habits_user_id_users_id_fk"
		}),
]);

export const completedHabits = pgTable("completed_habits", {
	id: serial().primaryKey().notNull(),
	habitId: serial("habit_id").notNull(),
	completedAt: timestamp("completed_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.habitId],
			foreignColumns: [habits.id],
			name: "completed_habits_habit_id_habits_id_fk"
		}),
]);

export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	email: varchar({ length: 256 }).notNull(),
	passwordHash: text().notNull(),
});
