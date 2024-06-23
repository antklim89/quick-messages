import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { FindMessagesQueryKey, MESSAGES_LIMIT } from '~/requests';
import { messageSchema } from '~/schemas';
import createSupabaseClient from '~/supabase/app';
import { IMessage } from '~/types/message';
import { getUser, transformMessage } from '~/utils';


async function findFavorites({ lastId }: {lastId?: number}) {
    const supabase = await createSupabaseClient();
    const user = await getUser({ required: true });

    const supabaseQuery = supabase
        .from('messages')
        .select('*, author:authorId(*), subject:subjectBody, messages(count), likes(userId), favorites!inner(userId)')
        .eq('favorites.userId', user.id)
        .range(0, MESSAGES_LIMIT - 1)
        .order('createdAt', { ascending: false });

    if (lastId) supabaseQuery.lt('id', lastId);

    const { data, error } = await supabaseQuery;

    if (error) {
        console.error(error.message);
        throw new Error('Failed to load my favorite messages. Try again later.');
    }

    return data;
}

export function useFindFavoritesRequest() {
    return useInfiniteQuery<IMessage[], Error, InfiniteData<IMessage[]>, FindMessagesQueryKey, number>({
        queryKey: ['FIND_MESSAGES', {isFavorites: true}],
        async queryFn({ pageParam: lastId }) {
            const user = await getUser();
            const data = await findFavorites({ lastId });

            return messageSchema.array().parseAsync(data.map((i) => transformMessage(i, user ? user.id : null)));
        },
        getNextPageParam(lastPage) {
            return lastPage.slice().pop()?.id;
        },
        initialPageParam: 0,
    });
}
