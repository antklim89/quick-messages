import { z } from 'zod';


export const registerSchema = z.object({
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
});

export const loginSchema = registerSchema.pick({ email: true, password: true });

export const profileSchema = z.object({
    name: z.string(),
    id: z.string(),
});
