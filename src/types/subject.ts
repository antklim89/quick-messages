import { z } from 'zod';
import { subjectSchema } from '../schemas/subjectSchema';


export type ISubject = z.infer<typeof subjectSchema>;
