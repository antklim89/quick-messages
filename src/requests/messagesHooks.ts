import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEndScreenTrigger } from '~/hooks';
import { messageSchema } from '~/schemas';
import supabase from '~/supabase/app';
import { IEditMessageInput, IMessage } from '~/types/message';


const MESSAGES_LIMIT = 10;

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
            queryClient.setQueryData<IMessage[]>(['FIND_MESSAGES'], (oldMessages = []) => [data, ...oldMessages]);
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

export function useFindMessagesRequest({ answerToId }: {answerToId?: number} = {}) {
    const { addEvent } = useEndScreenTrigger(fetchNextPage);
    const queryClient = useQueryClient();

    async function supabaseRequest({ lastId }: { lastId?: number; } = {}) {
        const supabaseQuery = supabase
            .from('messages')
            .select('*, author(*)')
            .limit(MESSAGES_LIMIT)
            .order('createdAt', { ascending: false });

        if (lastId) supabaseQuery.lt('id', lastId);
        if (answerToId) supabaseQuery.eq('answerTo', answerToId);

        const { data, error } = await supabaseQuery;

        if (error) throw error;
        return messageSchema.array().parseAsync(data);
    }

    const query = useQuery<IMessage[]>({
        queryKey: ['FIND_MESSAGES'],
        queryFn() {
            return supabaseRequest();
        },
        onSuccess() {
            addEvent();
        },
    });

    async function fetchNextPage() {
        const lastId = query.data?.slice().pop()?.id;
        const newMessages = await supabaseRequest({ lastId });

        queryClient.setQueryData<IMessage[]>(['FIND_MESSAGES'], (oldMessages = []) => [...oldMessages, ...newMessages]);

        if (newMessages.length >= MESSAGES_LIMIT) addEvent();
    }

    return query;
}

