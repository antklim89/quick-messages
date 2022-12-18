import { z } from 'zod';
import { authSchema, profileSchema } from '~/schemas';


export interface IUser {
    email?: string|null
    id: string
}

export type AuthInput = z.infer<typeof authSchema>
export type IProfile = z.infer<typeof profileSchema>
