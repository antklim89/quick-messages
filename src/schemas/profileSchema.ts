import { z } from 'zod';


export const profileSchema = z.object({
    name: z.string(),
    bio: z.string(),
});
