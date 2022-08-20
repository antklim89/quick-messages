import { z } from 'zod';


export const firebaseDateSchema = z
    .object({ seconds: z.number(), nanoseconds: z.number() })
    .transform<string>(({ seconds }) => {
        return new Date(seconds * 1000).toLocaleString();
    });
