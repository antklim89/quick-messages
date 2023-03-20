import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryName } from './constants';
import supabase from '~/supabase/app';
import { IMessage } from '~/types';
import { getUser } from '~/utils';


export async function likeRequest({ messageId }: {messageId: number}) {
    const { id: userId } = await getUser({ errorMessage: 'Log in to like message' });

    const { error } = await supabase
        .from('likes')
        .insert({ messageId, userId });


    if (error) {
        console.error(error.message);
        if (error) throw new Error('Failed to unlike message. Try again later.');
    }
}

export async function unlikeRequest({ messageId }: {messageId: number}) {
    const { id: userId } = await getUser({ errorMessage: 'Log in to unlike message' });

    const { error } = await supabase
        .from('likes')
        .delete()
        .eq('messageId', messageId)
        .eq('userId', userId);

    if (error) {
        console.error(error.message);
        if (error) throw new Error('Failed to like message. Try again later.');
    }
}


interface Likes {
    hasLiked: boolean;
    likesCount: number;
}

export function useLikeRequest({
    id: messageId,
    hasLiked: initialHasLiked,
    likesCount: initialLikesCount,
}: Pick<IMessage, 'id' | 'hasLiked' | 'likesCount'>) {
    const toast = useToast();

    const queryClient = useQueryClient();

    const { data = { hasLiked: initialHasLiked, likesCount: initialLikesCount } } = useQuery<Likes>({
        queryFn: () => ({ hasLiked: initialHasLiked, likesCount: initialLikesCount }),
        queryKey: [QueryName.LIKES, messageId],
    });

    const mutation = useMutation<void, Error, void>({
        async mutationFn() {
            if (data.hasLiked) await unlikeRequest({ messageId });
            else await likeRequest({ messageId });
        },
        async onSuccess() {
            await queryClient.setQueryData<Likes>(
                [QueryName.LIKES, messageId],
                (oldLikes) => oldLikes && ({
                    hasLiked: !oldLikes.hasLiked,
                    likesCount: oldLikes.hasLiked ? oldLikes.likesCount - 1 : oldLikes.likesCount + 1,
                }),
            );
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
    return { ...mutation, data };
}

