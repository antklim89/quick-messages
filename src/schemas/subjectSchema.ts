import { z } from 'zod';


export const subjectSchema = z.object({
    id: z.number(),
    body: z.string(),
});


export const subjectBodySchema = z.string()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z 0-9]*$/)
    .trim()
    .transform((v) => v.toLowerCase());
