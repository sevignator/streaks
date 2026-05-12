ALTER TABLE "completed_habits" RENAME TO "completions";--> statement-breakpoint
ALTER TABLE "completions" RENAME COLUMN "completed_at" TO "date";--> statement-breakpoint
ALTER TABLE "completions" DROP CONSTRAINT "completed_habits_habit_id_habits_id_fk";
--> statement-breakpoint
ALTER TABLE "completions" ADD CONSTRAINT "completions_habit_id_habits_id_fk" FOREIGN KEY ("habit_id") REFERENCES "public"."habits"("id") ON DELETE no action ON UPDATE no action;