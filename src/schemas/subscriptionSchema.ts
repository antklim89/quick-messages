import { z } from 'zod';


export const subscriptionSchema = z.object({
    id: z.number(),
    subject: z.string(),
    userId: z.string(),
});
