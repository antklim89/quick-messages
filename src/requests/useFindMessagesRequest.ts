import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { MESSAGES_LIMIT, QueryName } from './constants';
import { useEndScreenTrigger } from '~/hooks';
import { messageSchema } from '~/schemas';
import supabase from '~/supabase/app';
import { IMessage } from '~/types/message';


export function useFindMessagesRequest({ answerToId }: { answerToId?: number; } = {}) {
    const reactQuery = useInfiniteQuery<IMessage[]>({
        queryKey: [QueryName.FIND_MESSAGES, answerToId],
        async queryFn({ pageParam: lastId }) {
            const supabaseQuery = supabase
                .from('messages')
                .select('*, author(*), messages(id)')
                .range(0, MESSAGES_LIMIT - 1)
                .order('createdAt', { ascending: false });

            if (lastId) supabaseQuery.lt('id', lastId);

            if (answerToId) supabaseQuery.eq('answerTo', answerToId);
            else supabaseQuery.is('answerTo', null);

            const { data, error } = await supabaseQuery;

            if (error) throw error;
            return messageSchema.array().parseAsync(data);
        },
        getNextPageParam: (lastPage) => lastPage.slice().pop()?.id,
    });

    const { addEvent } = useEndScreenTrigger(reactQuery.fetchNextPage);

    useEffect(() => {
        if (!reactQuery.isFetching) addEvent();
    }, [reactQuery.isFetching]);

    return reactQuery;
}
