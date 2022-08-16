import { z } from 'zod';


export const editMessageSchema = z.object({
    body: z.string()
        .trim()
        .max(400)
        .min(5),
});

export type EditMessageSchemaType = z.infer<typeof editMessageSchema>
