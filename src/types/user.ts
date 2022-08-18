import { z } from 'zod';
import { loginSchema, registerSchema } from '~/schemas';


export interface IUser {
    email: string|null
    name: string
    uid: string
    isAnonymous: boolean
}

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
