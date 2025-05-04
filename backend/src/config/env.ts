import { z } from "zod";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Define environment variables schema with validation
const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),
  CORS_ORIGIN: z.string().default("*"),
  LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),
});

// Extract and validate environment variables
const env = envSchema.parse(process.env);

export default env;
