import { z } from 'zod';
import { authInputSchema } from '../../schemas/authShemas';


export interface AuthProps {
    type?: 'register'|'login'
}


export type AuthSchemaType = z.infer<typeof authInputSchema>
