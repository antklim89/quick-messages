import { useQuery, useQueryClient } from '@tanstack/react-query';
import { MESSAGES_LIMIT, QueryName } from './constants';
import { useEndScreenTrigger } from '~/hooks';
import { messageSchema } from '~/schemas';
import supabase from '~/supabase/app';
import { IMessage } from '~/types/message';


export function useFindMessagesRequest({ answerToId }: { answerToId?: number; } = {}) {
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
        else supabaseQuery.is('answerTo', null);

        const { data, error } = await supabaseQuery;

        if (error) throw error;
        return messageSchema.array().parseAsync(data);
    }

    const query = useQuery<IMessage[]>({
        queryKey: [QueryName.FIND_MESSAGES, answerToId],
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

        queryClient.setQueryData<IMessage[]>(
            [QueryName.FIND_MESSAGES, answerToId],
            (oldMessages = []) => [...oldMessages, ...newMessages],
        );

        if (newMessages.length >= MESSAGES_LIMIT) addEvent();
    }

    return query;
}
