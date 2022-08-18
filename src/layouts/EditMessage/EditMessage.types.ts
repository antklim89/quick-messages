import { z } from 'zod';
import { editMessageSchema } from '~/schemas';
import { IMessage } from '~/types';


export interface EditMessageProps {
    message?: IMessage
    id?: string
}


export type EditMessageType = z.infer<typeof editMessageSchema>
