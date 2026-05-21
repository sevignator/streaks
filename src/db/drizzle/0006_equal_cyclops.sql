ALTER TABLE "password_reset_tokens" RENAME COLUMN "tokenHash" TO "token_hash";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "passwordHash" TO "password_hash";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "time_zone" text NOT NULL;--> statement-breakpoint
ALTER TABLE "completions" ADD CONSTRAINT "habit_completion" UNIQUE("habit_id","completed_on");