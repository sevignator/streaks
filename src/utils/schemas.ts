import z from "zod";

export const dateSchema = z.date();
export const dateISOSchema = z.string();

export const inputNicknameSchema = z
  .string()
  .max(30, "Nickname must be at most 30 characters long");
export const inputEmailSchema = z
  .email()
  .max(255, "Email must be at most 255 characters long");
export const inputPasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(100, "Password must be at most 100 characters long");
export const inputHabitTitleSchema = z
  .string()
  .min(3, "Titles must be at least 3 characters long");
export const inputHabitIntervalSchema = z
  .number()
  .min(1, "Intervals cannot be lower than 1 day")
  .max(7, "Intervals cannot be higher than 7 days");
export const inputHabitIsActiveSchema = z.boolean();

export const emailSchema = z.object({
  to: z.string(),
  subject: z.string(),
  html: z.string(),
});

export const habitIdSchema = z.number();

export const passwordResetTokenSchema = z.string();

export const userIdSchema = z.number();
