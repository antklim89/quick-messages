import { z } from 'zod';


export const authInputSchema = z.object({
    email: z.string()
        .email()
        .trim()
        .max(50)
        .min(2),
    password: z.string()
        .trim()
        .max(50)
        .min(5),
});

export const authorSchema = z.object({
    name: z.string(),
    id: z.string(),
});
