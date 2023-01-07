import { useToast } from '@chakra-ui/react';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryName } from './constants';
import { useUser } from './useUser';
import { messageSchema } from '~/schemas';
import supabase from '~/supabase/app';
import { IEditMessageInput, IMessage } from '~/types/message';
import { transformMessage } from '~/utils';


export function useCreateMessageRequest({ answerToId }: { answerToId?: number; }) {
    const queryClient = useQueryClient();
    const { getUserId } = useUser();
    const toast = useToast();

    return useMutation<IMessage, Error, { values: IEditMessageInput; }>({
        async mutationFn({ values }) {
            const userId = getUserId();

            const { error, data } = await supabase
                .from('messages')
                .insert({
                    ...values,
                    author: userId,
                    answerTo: answerToId,
                })
                .select('*, author(*), messages(count), likes(user), favorites(user)')
                .single();
            if (error) throw new Error('Failed to add new message. Try again later.');

            return messageSchema.parseAsync(transformMessage(data, userId));
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
