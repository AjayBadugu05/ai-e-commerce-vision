import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Fallback to safe placeholder values when VITE_SUPABASE_URL environment variable is omitted in deployment (e.g. Vercel zero-cost hosting)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://placeholder-zero-cost.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "placeholder-anon-key";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});