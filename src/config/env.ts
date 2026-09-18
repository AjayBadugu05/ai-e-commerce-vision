import { z } from 'zod';

/**
 * Zod schema for environment variable validation.
 * Ensures typed configuration with safe zero-cost fallbacks.
 */
const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().default('https://mock-aether-db.supabase.co'),
  VITE_SUPABASE_PUBLISHABLE_KEY: z.string().default('mock-aether-anon-key-0192837465'),
  MODE: z.string().default('production'),
  DEV: z.boolean().default(false),
  PROD: z.boolean().default(true),
});

const rawEnv = {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_PUBLISHABLE_KEY: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
};

export const env = envSchema.parse(rawEnv);
