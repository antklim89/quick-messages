import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryName } from './constants';
import { likeRequest, unlikeRequest } from '~/requests';
import { IMessage } from '~/types';


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
            if (data.hasLiked) unlikeRequest({ messageId });
            else likeRequest({ messageId });
        },
        async onSuccess() {
            queryClient.setQueryData<Likes>(
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

