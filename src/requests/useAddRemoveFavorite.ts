import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FavsMessagesQueryKey, FindMessageQueryKey } from './constants';
import createSupabaseClient from '~/supabase/app';
import { IMessage } from '~/types';
import { getUser } from '~/utils';


export async function addFavoriteRequest({ messageId }: {messageId: number}) {
    const supabase = await createSupabaseClient();
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
    const supabase = await createSupabaseClient();
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
    inFavorites,
}: Pick<IMessage, 'id' | 'favoritesCount' | 'inFavorites'>) {
    const toast = useToast();
    const queryClient = useQueryClient();

    const mutation = useMutation<void, Error, void>({
        async mutationFn() {
            if (inFavorites) await removeFavoriteRequest({ messageId });
            else await addFavoriteRequest({ messageId });
        },
        async onSuccess() {
            await queryClient.setQueryData<IMessage>(
                ['FIND_MESSAGE', { messageId }] satisfies FindMessageQueryKey,
                (message) => message && ({
                    ...message,
                    inFavorites: !message.inFavorites,
                    favoritesCount: message.inFavorites ? message.favoritesCount - 1 : message.favoritesCount + 1,
                }),
            );
            await queryClient.invalidateQueries({ queryKey: ['FAVS_MESSAGES'] satisfies FavsMessagesQueryKey });
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
    return mutation;
}
