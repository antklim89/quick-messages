import { z } from 'zod';
import { loginSchema, profileSchema, registerSchema } from '~/schemas';


export interface IUser {
    email: string|null
    name: string
    id: string
}

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type IProfile = z.infer<typeof profileSchema>
