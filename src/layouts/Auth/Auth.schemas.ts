import { z } from 'zod';


export const authSchema = z.object({
    name: z.string()
        .max(50)
        .min(2),
    email: z.string()
        .email()
        .trim()
        .max(50)
        .min(2),
    password: z.string()
        .trim()
        .max(50)
        .min(5),
    confirm: z.string()
        .trim()
        .max(50)
        .min(5),
});
