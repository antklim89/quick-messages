import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { messageSchema } from '~/schemas';
import supabase from '~/supabase/app';
import { IEditMessageInput, IMessage } from '~/types/message';


export function useCreateMessageRequest() {
    const queryClient = useQueryClient();

    return useMutation<IMessage, Error, { body: IEditMessageInput, answerToId?: number }>({
        async mutationFn({ body, answerToId }) {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user.id) throw new Error('You are not authenticated');

            const { error, data } = await supabase
                .from('messages')
                .insert({
                    ...body,
                    author: session?.user.id,
                    answerToId,
                })
                .select('*, author(*)')
                .single();

            if (error) throw error;

            return data;
        },
        onSuccess(data) {
            const prevData = queryClient.getQueryData<IMessage[]>(['FIND_MESSAGES']);
            queryClient.setQueryData<IMessage[]>(['FIND_MESSAGES'], [data, ...(prevData || [])]);
        },
    });
}

export function useUpdateMessageRequest() {
    return useMutation<void, Error, { messageId: number, body: IEditMessageInput }>({
        async mutationFn({ body, messageId }) {
            const { data } = await supabase.auth.getSession();
            if (!data.session?.user.id) throw new Error('You are not authenticated');

            const { error } = await supabase
                .from('messages')
                .update(body)
                .eq('id', messageId)
                .select('*, author(*)');

            if (error) throw error;
        },
    });
}

export function useFindMessagesRequest() {
    return useQuery<IMessage[]>({
        queryKey: ['FIND_MESSAGES'],
        async queryFn() {
            const { error, data } = await supabase
                .from('messages')
                .select('*, author(*)')
                .order('createdAt', { ascending: false });

            if (error) throw error;

            return messageSchema.array().parseAsync(data);
        },

    });
}

