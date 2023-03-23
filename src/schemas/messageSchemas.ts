import { z } from 'zod';
import { authorSchema } from './authShemas';


export const editMessageSchema = z.object({
    body: z.string()
        .trim()
        .max(400)
        .min(5),
    subjectId: z.number().min(0),
});

export const messageSchema = z.object({
    id: z.number(),
    body: z.string(),
    author: authorSchema,
    createdAt: z.string(),
    messagesCount: z.number(),
    likesCount: z.number(),
    hasLiked: z.boolean(),
    favoritesCount: z.number(),
    inFavorites: z.boolean(),
});
