import { z } from 'zod';
import { profileSchema } from './authShemas';


export const editMessageSchema = z.object({
    body: z.string()
        .trim()
        .max(400)
        .min(5),
});

export const messageSchema = z.object({
    id: z.number(),
    body: z.string(),
    author: profileSchema,
    createdAt: z.string(),
    messagesCount: z.number(),
    likesCount: z.number(),
    hasLiked: z.boolean(),
});
