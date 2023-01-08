import { useToast } from '@chakra-ui/react';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryName } from './constants';
import { useUser } from './useUser';
import { createMessageRequest } from '~/requests';
import { messageSchema } from '~/schemas';
import { IEditMessageInput, IMessage } from '~/types';
import { transformMessage } from '~/utils';


export function useCreateMessageRequest({ answerToId }: { answerToId?: number; }) {
    const queryClient = useQueryClient();
    const { getUserId } = useUser();
    const toast = useToast();

    return useMutation<IMessage, Error, { values: IEditMessageInput; }>({
        async mutationFn({ values }) {
            const userId = getUserId();

            const newMessage = await createMessageRequest(values, answerToId);

            return messageSchema.parseAsync(transformMessage(newMessage, userId));
        },
        async onSuccess(newMessage) {
            await queryClient.setQueryData<InfiniteData<IMessage[]>>(
                [QueryName.FIND_MESSAGES, answerToId],
                (oldMessages) => ({
                    pageParams: oldMessages ? [answerToId, ...oldMessages.pageParams] : [answerToId],
                    pages: oldMessages ? [[newMessage], ...oldMessages.pages] : [[newMessage]],
                }),
            );

            await queryClient.setQueryData<IMessage>(
                [QueryName.FIND_MESSAGE, answerToId],
                (oldMessage) => (oldMessage && ({ ...oldMessage, messagesCount: oldMessage.messagesCount + 1 })),
            );

            toast({ title: 'New message successfully added!', status: 'success' });
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}

