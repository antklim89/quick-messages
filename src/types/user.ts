import { z } from 'zod';
import { authInputSchema, profileSchema } from '~/schemas';


export interface IUser {
    email?: string|null
    id: string
}

export type IAuthInput = z.infer<typeof authInputSchema>
export type IProfile = z.infer<typeof profileSchema>
