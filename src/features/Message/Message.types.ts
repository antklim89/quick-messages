import { IMessage } from '~/types';


export interface MessageProps {
    message?: IMessage,
    id: IMessage['id']
    isMain?: boolean
}

export interface MessageCreateAnswerProps {
    messageId: number
}
