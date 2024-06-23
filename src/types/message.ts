import { z } from 'zod';
import { messageEditSchema, messageParamsSchema, messageSchema } from '~/schemas';


export type IEditMessageInput = z.infer<typeof messageEditSchema>

export type IMessage = z.infer<typeof messageSchema>

export type IMessageParams = z.infer<typeof messageParamsSchema>
