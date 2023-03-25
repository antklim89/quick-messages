import { z } from 'zod';


export const profileInputSchema = z.object({
    name: z.string(),
    bio: z.string(),
});

export const profileSchema = z.object({
    id: z.string(),
    bio: z.string(),
    name: z.string(),
    avatarUrl: z.string().nullish(),
});
