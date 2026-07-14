import { sql } from 'drizzle-orm';
import {
  bigint,
  boolean,
  date,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: bigint({ mode: 'number'})
    .generatedAlwaysAsIdentity()
    .primaryKey(),
  nickname: text('nickname')
    .notNull(),
  email: text('email')
    .unique()
    .notNull(),
  passwordHash: text('password_hash')
    .notNull(),
  timeZone: text('time_zone')
    .notNull(),
});

export const habits = pgTable('habits', {
  id: bigint({ mode: 'number'})
    .generatedAlwaysAsIdentity()
    .primaryKey(),
  title: text('title')
    .notNull(),
  interval: integer('interval')
    .notNull(),
  isActive: boolean('is_active')
    .default(true)
    .notNull(),
  userId: bigint('user_id', { mode: 'number' })
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const completions = pgTable(
  'completions',
  {
    id: bigint({ mode: 'number'})
      .generatedAlwaysAsIdentity()
      .primaryKey(),
    habitId: bigint('habit_id', { mode: 'number' })
      .references(() => habits.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    completedOn: date('completed_on', { mode: 'string' })
      .notNull(),
  },
  (t) => [unique('habit_completion').on(t.habitId, t.completedOn)],
);

export const passwordResetTokens = pgTable('password_reset_tokens', {
  id: bigint({ mode: 'number' })
    .generatedAlwaysAsIdentity()
    .primaryKey(),
  tokenHash: text('token_hash')
    .unique()
    .notNull(),
  userId: bigint('user_id', { mode: 'number' })
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true })
    .default(sql`now() + interval '30 minutes'`)
    .notNull(),
  isRedeemed: boolean('is_redeemed')
    .default(false)
    .notNull(),
});

export type NewUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export type NewHabit = typeof habits.$inferInsert;
export type Habit = typeof habits.$inferSelect;

export type NewCompletion = typeof completions.$inferInsert;
export type Completion = typeof completions.$inferSelect;

export type NewPasswordResetToken = typeof passwordResetTokens.$inferInsert;
export type PasswordResetToken = typeof passwordResetTokens.$inferSelect;
