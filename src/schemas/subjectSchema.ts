import { z } from 'zod';


export const subjectSchema = z.object({
    id: z.string(),
    body: z.string(),
});
