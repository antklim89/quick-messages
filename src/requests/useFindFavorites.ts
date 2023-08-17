import { useToast } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ZodError } from 'zod';
import { FavoritesListQueryKey, MESSAGES_LIMIT } from '~/requests';
import { messageSchema } from '~/schemas';
import supabase from '~/supabase/app';
import { IMessage } from '~/types/message';
import { getUser, transformMessage } from '~/utils';


async function findMyFavorites({ lastId }: {lastId?: number}) {
    const user = await getUser({ required: true });

    const supabaseQuery = supabase
        .from('messages')
        .select('*, author:authorId(*), subject:subjectBody(body), messages(count), likes(userId), favorites!inner(userId)')
        .eq('favorites.userId', user.id)
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

    return useInfiniteQuery<IMessage[], Error, IMessage[], FavoritesListQueryKey>({
        queryKey: ['FAVORITES_LIST'],
        async queryFn({ pageParam: lastId }) {
            const user = await getUser();
            const data = await findMyFavorites({ lastId });

            return messageSchema.array().parseAsync(data.map((i) => transformMessage(i, user ? user.id : null)));
        },
        getNextPageParam(lastPage) {
            return lastPage.slice().pop()?.id;
        },
        onError(error) {
            if (error instanceof ZodError) toast({ title: 'Unexpected error. Try again later.', status: 'error' });
            else toast({ title: error.message, status: 'error' });
        },
    });
}
