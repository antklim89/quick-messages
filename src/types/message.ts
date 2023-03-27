import { z } from 'zod';
import { editMessageSchema, messageParamsSchema, messageSchema } from '~/schemas';


export type IEditMessageInput = z.infer<typeof editMessageSchema>

export type IMessage = z.infer<typeof messageSchema>

export type IMessageParams = z.infer<typeof messageParamsSchema>
