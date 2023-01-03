import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryName } from './constants';
import { messageSchema } from '~/schemas';
import supabase from '~/supabase/app';
import { IEditMessageInput, IMessage } from '~/types/message';



export function useCreateMessageRequest({ answerToId }: { answerToId?: number; }) {
    const queryClient = useQueryClient();

    return useMutation<IMessage, Error, { body: IEditMessageInput; }>({
        async mutationFn({ body }) {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user.id)
                throw new Error('You are not authenticated');

            const { error, data } = await supabase
                .from('messages')
                .insert({
                    ...body,
                    author: session?.user.id,
                    answerTo: answerToId,
                })
                .select('*, author(*)')
                .single();

            if (error)
                throw error;

            return messageSchema.parseAsync(data);
        },
        onSuccess(data) {
            queryClient.setQueryData<IMessage[]>(
                [QueryName.FIND_MESSAGES, answerToId],
                (oldMessages = []) => (oldMessages.length === 0 ? [] : [data, ...oldMessages])
            );
        },
    });
}
