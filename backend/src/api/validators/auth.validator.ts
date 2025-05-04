import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

// Empty schema since we're now getting the refresh token from cookies
export const refreshTokenSchema = z.object({});

export const emailSchema = z.object({
  email: z.string().email("Invalid email format"),
});
