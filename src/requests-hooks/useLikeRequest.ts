import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryName } from './constants';
import { likeRequest, unlikeRequest } from '~/requests';
import { IMessage } from '~/types';


export function useLikeRequest({ messageId }: {messageId: number}) {
    const toast = useToast();
    const queryClient = useQueryClient();

    return useMutation<void, Error, {hasLiked: boolean}>({
        async mutationFn({ hasLiked }) {
            if (hasLiked) unlikeRequest({ messageId });
            else likeRequest({ messageId });
        },
        async onSuccess() {
            await queryClient.setQueryData<IMessage>(
                [QueryName.FIND_MESSAGE, messageId],
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
