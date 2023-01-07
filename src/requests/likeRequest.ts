import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryName } from './constants';
import { useUser } from './useUser';
import supabase from '~/supabase/app';
import { IMessage } from '~/types';


export function useLikeRequest({ message }: {message: number}) {
    const { id: userId } = useUser();
    const toast = useToast();
    const queryClient = useQueryClient();

    return useMutation<void, Error, {hasLiked: boolean}>({
        async mutationFn({ hasLiked }) {
            if (!userId) throw new Error('Login to like messages');

            if (hasLiked) {
                const { error } = await supabase
                    .from('likes')
                    .delete()
                    .eq('message', message)
                    .eq('user', userId);
                if (error) throw new Error('Failed to like message. Try again later.');
            } else {
                const { error } = await supabase
                    .from('likes')
                    .insert({ message, user: userId });
                if (error) throw new Error('Failed to unlike message. Try again later.');
            }
        },
        async onSuccess() {
            await queryClient.setQueryData<IMessage>(
                [QueryName.FIND_MESSAGE, message],
                (oldMessage) => (oldMessage && ({
                    ...oldMessage,
                    hasLiked: !oldMessage.hasLiked,
                    likesCount: oldMessage.hasLiked ? oldMessage.likesCount - 1 : oldMessage.likesCount + 1,
                })),
            );
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}
