import { z } from 'zod';
import { editMessageSchema } from './EditMessage.schemas';
import { IMessage } from '~/types/message';


export interface EditMessageProps {
    message?: IMessage
}


export type EditMessageType = z.infer<typeof editMessageSchema>
