import { useInfiniteQuery } from '@tanstack/react-query';
import { MESSAGES_LIMIT, QueryName } from './constants';
import { messageSchema } from '~/schemas';
import supabase from '~/supabase/app';
import { IMessage } from '~/types/message';


export function useFindMessagesRequest({ answerToId }: { answerToId?: number; } = {}) {
    return useInfiniteQuery<IMessage[]>({
        queryKey: [QueryName.FIND_MESSAGES, answerToId],
        async queryFn({ pageParam: lastId }) {
            const supabaseQuery = supabase
                .from('messages')
                .select('*, author(*), messages(count), likes(count)')
                .range(0, MESSAGES_LIMIT - 1)
                .order('createdAt', { ascending: false });

            if (lastId) supabaseQuery.lt('id', lastId);

            if (answerToId) supabaseQuery.eq('answerTo', answerToId);
            else supabaseQuery.is('answerTo', null);

            const { data, error } = await supabaseQuery;

            if (error) throw error;
            return messageSchema.array().parseAsync(data.map((i) => ({
                ...i,
                messagesCount: Array.isArray(i.messages) ? i.messages[0]?.count : i.messages?.count,
                likesCount: Array.isArray(i.likes) ? i.likes[0]?.count : i.likes?.count,
            })));
        },
        getNextPageParam: (lastPage) => lastPage.slice().pop()?.id,
    });
}
