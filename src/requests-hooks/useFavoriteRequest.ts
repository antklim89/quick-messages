import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryName } from './constants';
import { addFavoriteRequest, removeFavoriteRequest } from '~/requests';
import { IMessage } from '~/types';


type Favorites = Pick<IMessage, 'favoritesCount' | 'inFavorites'>

export function useFavoriteRequest({
    id: messageId,
    inFavorites: initialInFavorites,
    favoritesCount: initialFavoritesCount,
}: Pick<IMessage, 'id' | 'favoritesCount' | 'inFavorites'>) {
    const toast = useToast();
    const queryClient = useQueryClient();

    const { data = { inFavorites: initialInFavorites, favoritesCount: initialFavoritesCount } } = useQuery<Favorites>({
        queryFn: () => ({ inFavorites: initialInFavorites, favoritesCount: initialFavoritesCount }),
        queryKey: [QueryName.FAVORITES, messageId],
    });

    const mutation = useMutation<void, Error, void>({
        async mutationFn() {
            if (data.inFavorites) await removeFavoriteRequest({ messageId });
            else await addFavoriteRequest({ messageId });
        },
        async onSuccess() {
            await queryClient.setQueryData<Favorites>(
                [QueryName.FAVORITES, messageId],
                (oldFavs) => (oldFavs && ({
                    inFavorites: !oldFavs.inFavorites,
                    favoritesCount: oldFavs.inFavorites ? oldFavs.favoritesCount - 1 : oldFavs.favoritesCount + 1,
                })),
            );
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
    return { ...mutation, data };
}
