import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomId() {
  return uuidv4();
}

export function isEmail(email: string) {
  const emailSchema = z.string().email({ message: "Invalid email address" });

  const result = emailSchema.safeParse(email);

  if (result.success) {
    console.log("Valid email:", result.data);
  } else {
    console.log("Validation error:", result.error.errors);
  }
  return result.success;
}

export function isPassword(password: string) {
  const passwordSchema = z
    .string()
    .min(8, { message: "Password must be at least 8 characters" });

  const result = passwordSchema.safeParse(password);

  if (result.success) {
    console.log("Valid password:", result.data);
  } else {
    console.log("Validation error:", result.error.errors);
  }
  return result.success;
}
