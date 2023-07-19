import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FavoritesButtonQueryKey, FavoritesListQueryKey } from './constants';
import supabase from '~/supabase/app';
import { IMessage } from '~/types';
import { getUser } from '~/utils';


type Favorites = Pick<IMessage, 'favoritesCount' | 'inFavorites'>


export async function addFavoriteRequest({ messageId }: {messageId: number}) {
    const { id: userId } = await getUser({ errorMessage: 'Login to add favorite message' });

    const { error } = await supabase
        .from('favorites')
        .insert({ messageId, userId });

    if (error) {
        console.error(error.message);
        throw new Error('Failed to add favorite message. Try again later.');
    }
}


export async function removeFavoriteRequest({ messageId }: {messageId: number}) {
    const { id: userId } = await getUser();

    const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('messageId', messageId)
        .eq('userId', userId);

    if (error) {
        console.error(error.message);
        throw new Error('Failed to remove favorite message. Try again later.');
    }
}


export function useFavoriteRequest({
    id: messageId,
    inFavorites: initialInFavorites,
    favoritesCount: initialFavoritesCount,
}: Pick<IMessage, 'id' | 'favoritesCount' | 'inFavorites'>) {
    const toast = useToast();
    const queryClient = useQueryClient();

    const { data = { inFavorites: initialInFavorites, favoritesCount: initialFavoritesCount } } = useQuery<Favorites>({
        queryFn: () => ({ inFavorites: initialInFavorites, favoritesCount: initialFavoritesCount }),
        queryKey: ['FAVORITES_BUTTON', { messageId }] satisfies FavoritesButtonQueryKey,
    });


    const mutation = useMutation<void, Error, void>({
        async mutationFn() {
            if (data.inFavorites) await removeFavoriteRequest({ messageId });
            else await addFavoriteRequest({ messageId });
        },
        async onSuccess() {
            await queryClient.setQueryData<Favorites>(
                ['FAVORITES_BUTTON', { messageId }] satisfies FavoritesButtonQueryKey,
                (oldFavs) => (oldFavs && ({
                    inFavorites: !oldFavs.inFavorites,
                    favoritesCount: oldFavs.inFavorites ? oldFavs.favoritesCount - 1 : oldFavs.favoritesCount + 1,
                })),
            );
            await queryClient.invalidateQueries(['FAVORITES_LIST'] satisfies FavoritesListQueryKey);
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
    return { ...mutation, data };
}
