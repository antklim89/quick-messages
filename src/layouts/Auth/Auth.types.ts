import { z } from 'zod';
import { authSchema } from '../../schemas/authShemas';


export interface AuthProps {
    type?: 'register'|'login'
}


export type AuthSchemaType = z.infer<typeof authSchema>
