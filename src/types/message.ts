import { z } from 'zod';
import { editMessageSchema, messageSchema } from '~/schemas';


export type IEditMessageInput = z.infer<typeof editMessageSchema>

export type IMessage = z.infer<typeof messageSchema>
