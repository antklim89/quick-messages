import { z } from 'zod';
import { authInputSchema, authorSchema, profileSchema } from '~/schemas';


export interface IUser {
    email?: string|null
    id: string
}

export type IAuthInput = z.infer<typeof authInputSchema>
export type IAuthor = z.infer<typeof authorSchema>
export type IProfile = z.infer<typeof profileSchema>
