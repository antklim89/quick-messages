import { z } from 'zod';


export const editMessageSchema = z.object({
    body: z.string()
        .trim()
        .max(400)
        .min(5),
});

export const messageSchema = z.object({
    id: z.string(),
    body: z.string(),
    author: z.string(),
    createdAt: z.string(),
});
