import { useToast } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { QueryName } from './constants';
import { MESSAGES_LIMIT } from '~/requests-hooks/constants';
import { messageSchema } from '~/schemas';
import supabase from '~/supabase/app';
import { IMessage } from '~/types/message';
import { getUser, transformMessage } from '~/utils';


async function findMyFavorites({ lastId }: {lastId?: number}) {
    const user = await getUser({ required: true });

    const supabaseQuery = supabase
        .from('messages')
        .select('*, authorId(*), messages(count), likes(userId), favorites(userId)')
        .eq('favorites.user', user.id)
        .range(0, MESSAGES_LIMIT - 1)
        .order('createdAt', { ascending: false });

    if (lastId) supabaseQuery.lt('id', lastId);

    const { data, error } = await supabaseQuery;

    if (error) {
        console.error(error.message);
        throw new Error('Failed to load messages. Try again later.');
    }

    return data;
}

export function useFindMyFavoritesRequest() {
    const toast = useToast();

    return useInfiniteQuery<IMessage[], Error>({
        queryKey: [QueryName.MY_FAVORITES],
        async queryFn({ pageParam: lastId }) {
            const user = await getUser();
            const data = await findMyFavorites({ lastId });

            return messageSchema.array().parseAsync(data.map((i) => transformMessage(i, user ? user.id : null)));
        },
        getNextPageParam(lastPage) {
            return lastPage.slice().pop()?.id;
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}
