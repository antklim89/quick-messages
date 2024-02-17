import { useToast } from '@chakra-ui/react';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { FindMessageQueryKey, FindMessagesQueryKey } from './constants';
import createSupabaseClient from '~/supabase/app';
import { IMessage } from '~/types';
import { getUser } from '~/utils';


export async function deleteMessageRequest(messageId: number) {
    const supabase = await createSupabaseClient();
    const { id: userId } = await getUser();

    const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', messageId)
        .eq('authorId', userId);

    if (error) {
        console.error(error.message);
        throw new Error('Failed to delete message. Try again later.');
    }
}


export function useDeleteMessageRequest({ messageId }: { messageId: number }) {
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation<void, Error>({
        async mutationFn() {
            await deleteMessageRequest(messageId);
        },
        async onSuccess() {
            await queryClient.setQueriesData<InfiniteData<IMessage[]>>(
                { predicate: (query) => query.queryKey[0] === 'FIND_MESSAGES' satisfies FindMessagesQueryKey[0] },
                (oldMessages) => ({
                    pageParams: oldMessages ? oldMessages.pageParams : [],
                    pages: oldMessages ? oldMessages.pages.map((i) => i.filter((j) => j.id !== messageId)) : [],
                }),
            );

            await queryClient.removeQueries({
                predicate: ({ queryKey }) => queryKey[0] === 'FIND_MESSAGE' satisfies FindMessageQueryKey[0] && queryKey[1] === messageId,
            });

            toast({ title: 'New message successfully deleted!', status: 'success' });
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}

