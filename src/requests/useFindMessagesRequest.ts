import { useToast } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MESSAGES_LIMIT, QueryName } from './constants';
import { useUser } from './useUser';
import { messageSchema } from '~/schemas';
import supabase from '~/supabase/app';
import { IMessage } from '~/types/message';
import { transformMessage } from '~/utils';


export function useFindMessagesRequest({ answerToId }: { answerToId?: number; } = {}) {
    const { id: userId } = useUser();
    const toast = useToast();

    return useInfiniteQuery<IMessage[]>({
        queryKey: [QueryName.FIND_MESSAGES, answerToId],
        async queryFn({ pageParam: lastId }) {
            const supabaseQuery = supabase
                .from('messages')
                .select('*, author(*), messages(count), likes(user), favorites(user)')
                .range(0, MESSAGES_LIMIT - 1)
                .order('createdAt', { ascending: false });

            if (lastId) supabaseQuery.lt('id', lastId);

            if (answerToId) supabaseQuery.eq('answerTo', answerToId);
            else supabaseQuery.is('answerTo', null);

            const { data, error } = await supabaseQuery;

            if (error) throw error;
            return messageSchema.array().parseAsync(data.map((i) => transformMessage(i, userId)));
        },
        getNextPageParam: (lastPage) => lastPage.slice().pop()?.id,
        onError() {
            toast({ title: 'Failed to load messages. Try again later.', status: 'success' });
        },
    });
}
