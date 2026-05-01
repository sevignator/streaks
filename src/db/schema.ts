import { boolean, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial().primaryKey(),
  nickname: text().notNull(),
  email: text().unique().notNull(),
  passwordHash: text().notNull(),
})

export const habits = pgTable('habits', {
  id: serial().primaryKey(),
  title: text('title').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  userId: serial('user_id')
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const completedHabits = pgTable('completed_habits', {
  id: serial().primaryKey(),
  habitId: serial('habit_id')
    .references(() => habits.id)
    .notNull(),
  completedAt: timestamp('completed_at').defaultNow().notNull(),
})

export type NewUser = typeof users.$inferInsert
export type User = typeof users.$inferSelect
export type NewHabit = typeof habits.$inferInsert
export type Habit = typeof habits.$inferSelect
