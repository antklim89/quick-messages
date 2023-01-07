import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryName } from './constants';
import { useUser } from './useUser';
import supabase from '~/supabase/app';
import { IMessage } from '~/types';


export function useFavoriteRequest({ messageId }: {messageId: number}) {
    const { id: userId } = useUser();
    const toast = useToast();
    const queryClient = useQueryClient();

    return useMutation<void, Error, {inFavorites: boolean}>({
        async mutationFn({ inFavorites }) {
            if (!userId) throw new Error('Login to add favorite message');

            if (inFavorites) {
                const { error } = await supabase
                    .from('favorites')
                    .delete()
                    .eq('message', messageId)
                    .eq('user', userId);
                if (error) throw new Error('Failed to add favorite message. Try again later.');
            } else {
                const { error } = await supabase
                    .from('favorites')
                    .insert({ message: messageId, user: userId });
                if (error) throw new Error('Failed to remove favorite message. Try again later.');
            }
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
