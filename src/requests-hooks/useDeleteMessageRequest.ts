import { useToast } from '@chakra-ui/react';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryName } from './constants';
import { deleteMessageRequest } from '~/requests/deleteMessageRequest';
import { IMessage } from '~/types';


export function useDeleteMessageRequest({ messageId }: { messageId: number }) {
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation<void, Error>({
        async mutationFn() {
            await deleteMessageRequest(messageId);
        },
        async onSuccess() {
            await queryClient.setQueriesData<InfiniteData<IMessage[]>>(
                { predicate: (query) => query.queryKey[0] === QueryName.FIND_MESSAGES },
                (oldMessages) => ({
                    pageParams: oldMessages ? oldMessages.pageParams : [],
                    pages: oldMessages ? oldMessages.pages.map((i) => i.filter((j) => j.id !== messageId)) : [],
                }),
            );

            await queryClient.removeQueries({
                predicate: ({ queryKey }) => queryKey[0] === QueryName.FIND_MESSAGE && queryKey[1] === messageId,
            });

            toast({ title: 'New message successfully deleted!', status: 'success' });
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}

