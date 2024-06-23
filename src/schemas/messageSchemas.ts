import { z } from 'zod';
import { authorSchema } from './authSchemas';
import { subjectEditSchema, subjectSchema } from './subjectSchema';


export const messageEditSchema = z.object({
    body: z.string()
        .trim()
        .max(400)
        .min(5),
    subjectBody: subjectEditSchema,
});

export const messageSchema = z.object({
    id: z.number(),
    body: z.string(),
    author: authorSchema,
    subject: subjectSchema,
    createdAt: z.string(),
    messagesCount: z.number(),
    likesCount: z.number(),
    hasLiked: z.boolean(),
    favoritesCount: z.number(),
    inFavorites: z.boolean(),
});

export const messageParamsSchema = z.object({
    answerToId: z.coerce.number().optional(),
    authorId: z.coerce.string().optional(),
    subjectBody: z.coerce.string().optional(),
});
