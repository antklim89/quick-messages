import { z } from 'zod';


export const SUPABASE_KEY = z.string({ required_error: 'VITE_SUPABASE_KEY is required' }).parse(import.meta.env.VITE_SUPABASE_KEY);
export const SUPABASE_URL = z.string({ required_error: 'VITE_SUPABASE_URL is required' }).parse(import.meta.env.VITE_SUPABASE_URL);
