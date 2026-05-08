import { sql } from 'drizzle-orm'
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
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
})

export const completedHabits = pgTable('completed_habits', {
  id: serial().primaryKey(),
  habitId: serial('habit_id')
    .references(() => habits.id)
    .notNull(),
  completedAt: timestamp('completed_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
})

export const passwordResetTokens = pgTable('password_reset_tokens', {
  id: serial().primaryKey(),
  tokenHash: text().notNull(),
  userId: serial('user_id')
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true })
    .default(sql`now() + interval '30 minutes'`)
    .notNull(),
  isRedeemed: boolean('is_redeemed').default(false).notNull(),
})

export type NewUser = typeof users.$inferInsert
export type User = typeof users.$inferSelect
export type NewHabit = typeof habits.$inferInsert
export type Habit = typeof habits.$inferSelect
export type NewPasswordResetToken = typeof passwordResetTokens.$inferInsert
export type PasswordResetToken = typeof passwordResetTokens.$inferSelect
