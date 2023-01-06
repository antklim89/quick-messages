import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryName } from './constants';
import { messageSchema } from '~/schemas';
import supabase from '~/supabase/app';
import { IEditMessageInput, IMessage } from '~/types/message';


export function useCreateMessageRequest({ answerToId }: { answerToId?: number; }) {
    const queryClient = useQueryClient();

    return useMutation<IMessage, Error, { body: IEditMessageInput; }>({
        async mutationFn({ body }) {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user.id) throw new Error('You are not authenticated');

            const { error, data } = await supabase
                .from('messages')
                .insert({
                    ...body,
                    author: session?.user.id,
                    answerTo: answerToId,
                })
                .select('*, author(*), messages(count), likes(count)')
                .single();
            if (error) throw error;

            return messageSchema.parseAsync({
                ...data,
                messagesCount: Array.isArray(data.messages) ? data.messages[0]?.count : data.messages?.count,
                likesCount: Array.isArray(data.likes) ? data.likes[0]?.count : data.likes?.count,
            });
        },
        onSuccess(newMessage) {
            queryClient.setQueryData<InfiniteData<IMessage[]>>(
                [QueryName.FIND_MESSAGES, answerToId],
                (old) => ({
                    pageParams: old?.pageParams ? [answerToId, ...old.pageParams] : [answerToId],
                    pages: old?.pages ? [[newMessage], ...old.pages] : [[newMessage]],
                }),
            );

            const oldMessage = queryClient.getQueryData<IMessage>([QueryName.FIND_MESSAGE, answerToId]);
            if (oldMessage && answerToId) {
                queryClient.setQueryData<IMessage>(
                    [QueryName.FIND_MESSAGE, answerToId],
                    { ...oldMessage, messagesCount: oldMessage.messagesCount + 1 },
                );
            }
        },
    });
}
