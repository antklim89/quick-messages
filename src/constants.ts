import { z } from 'zod';


export const { VITE_SUPABASE_KEY, VITE_SUPABASE_URL, VITE_SUPABASE_BUCKET_URL } = z.object({
    VITE_SUPABASE_KEY: z.string(),
    VITE_SUPABASE_URL: z.string(),
    VITE_SUPABASE_BUCKET_URL: z.string(),
}).parse(import.meta.env);
