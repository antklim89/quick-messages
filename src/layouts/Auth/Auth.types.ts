import { z } from 'zod';
import { registerSchema } from '../../schemas/authShemas';


export interface AuthProps {
    type?: 'register'|'login'
}


export type RegisterSchemaType = z.infer<typeof registerSchema>
