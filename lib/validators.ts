import { z } from "zod";

export const EVENT_TYPES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Blood Drive",
  "Food Relief",
  "Education",
] as const;

const email = z.string().trim().min(1, "Enter your email").email("Enter a valid email address");

const password = z
  .string()
  .min(6, "Password needs at least 6 characters")
  .regex(/[A-Z]/, "Password needs an uppercase letter")
  .regex(/[a-z]/, "Password needs a lowercase letter");

const httpUrl = (message: string) =>
  z
    .string()
    .trim()
    .url(message)
    .regex(/^https?:\/\//i, message);

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  email,
  image: httpUrl("Enter a valid photo URL"),
  password,
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Enter your password"),
});

export const profileSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  image: httpUrl("Enter a valid photo URL"),
});

export const eventFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title needs at least 5 characters")
    .max(100, "Title can have up to 100 characters"),
  description: z
    .string()
    .trim()
    .min(20, "Description needs at least 20 characters")
    .max(2000, "Description can have up to 2000 characters"),
  eventType: z.enum(EVENT_TYPES, { error: "Choose an event type" }),
  thumbnail: z
    .string()
    .trim()
    .url("Enter a valid image URL")
    .startsWith("https://", "The image URL must start with https://"),
  location: z
    .string()
    .trim()
    .min(3, "Location needs at least 3 characters")
    .max(120, "Location can have up to 120 characters"),
  eventDate: z
    .string()
    .min(1, "Choose the event date and time")
    .refine((value) => new Date(value).getTime() > Date.now(), "The event date must be in the future"),
});

export type FieldErrors = Record<string, string | undefined>;

/** Turns a Zod error into one message per field. */
export function fieldErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0]);
    errors[key] ??= issue.message;
  }
  return errors;
}
