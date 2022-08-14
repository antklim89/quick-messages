import { z } from 'zod';
import { authSchema } from './Auth.schemas';


export interface AuthProps {
    type?: 'register'|'login'
}


export type AuthType = z.infer<typeof authSchema>
