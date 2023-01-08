import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryName } from './constants';
import { addFavoriteRequest, removeFavoriteRequest } from '~/requests';
import { IMessage } from '~/types';


export function useFavoriteRequest({ messageId }: {messageId: number}) {
    const toast = useToast();
    const queryClient = useQueryClient();

    return useMutation<void, Error, {inFavorites: boolean}>({
        async mutationFn({ inFavorites }) {
            if (inFavorites) await removeFavoriteRequest({ messageId });
            else await addFavoriteRequest({ messageId });
        },
        async onSuccess() {
            await queryClient.setQueryData<IMessage>(
                [QueryName.FIND_MESSAGE, messageId],
                (oldMsg) => (oldMsg && ({
                    ...oldMsg,
                    inFavorites: !oldMsg.inFavorites,
                    favoritesCount: oldMsg.inFavorites ? oldMsg.favoritesCount - 1 : oldMsg.favoritesCount + 1,
                })),
            );
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}
