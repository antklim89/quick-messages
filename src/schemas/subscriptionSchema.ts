import { z } from 'zod';


export const subscriptionSchema = z.object({
    id: z.number(),
    subjectBody: z.string(),
    userId: z.string(),
});
