import { IMessage } from '~/types';


export interface MessageProps {
    message?: IMessage,
    id: IMessage['id']
}

export interface MessageCreateAnswerProps {
    messageId: number
}
