import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FindMessageQueryKey } from './constants';
import createSupabaseClient from '~/supabase/app';
import { IMessage } from '~/types';
import { getUser } from '~/utils';


export async function likeRequest({ messageId }: {messageId: number}) {
    const supabase = await createSupabaseClient();
    const { id: userId } = await getUser({ errorMessage: 'Log in to like message' });

    const { error } = await supabase
        .from('likes')
        .insert({ messageId, userId });


    if (error) {
        console.error(error.message);
        throw new Error('Failed to unlike message. Try again later.');
    }
}

export async function unlikeRequest({ messageId }: {messageId: number}) {
    const supabase = await createSupabaseClient();
    const { id: userId } = await getUser({ errorMessage: 'Log in to unlike message' });

    const { error } = await supabase
        .from('likes')
        .delete()
        .eq('messageId', messageId)
        .eq('userId', userId);

    if (error) {
        console.error(error.message);
        throw new Error('Failed to like message. Try again later.');
    }
}


export function useLikeRequest({
    id: messageId,
    hasLiked,
}: IMessage) {
    const toast = useToast();

    const queryClient = useQueryClient();

    const mutation = useMutation<void, Error, void>({
        async mutationFn() {
            if (hasLiked) await unlikeRequest({ messageId });
            else await likeRequest({ messageId });
        },

        async onSuccess() {
            await queryClient.setQueryData<IMessage>(
                ['FIND_MESSAGE', { messageId }] satisfies FindMessageQueryKey,
                (message) => message && ({
                    ...message,
                    hasLiked: !message.hasLiked,
                    likesCount: message.hasLiked ? message.likesCount - 1 : message.likesCount + 1,
                }),
            );
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
    return mutation;
}

