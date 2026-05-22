CREATE TABLE "completions" (
	"id" serial PRIMARY KEY NOT NULL,
	"habit_id" serial NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_on" date,
	CONSTRAINT "habit_completion" UNIQUE("habit_id","completed_on")
);
--> statement-breakpoint
CREATE TABLE "habits" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"interval" integer NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"user_id" serial NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "password_reset_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"token_hash" text NOT NULL,
	"user_id" serial NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone DEFAULT now() + interval '30 minutes' NOT NULL,
	"is_redeemed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"nickname" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"time_zone" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "completions" ADD CONSTRAINT "completions_habit_id_habits_id_fk" FOREIGN KEY ("habit_id") REFERENCES "public"."habits"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habits" ADD CONSTRAINT "habits_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;