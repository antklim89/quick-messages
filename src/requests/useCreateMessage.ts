import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FindMessageQueryKey, FindMessagesQueryKey } from './constants';
import supabase from '~/supabase/app';
import { IEditMessageInput, IMessage } from '~/types';
import { getUser } from '~/utils';


export async function createMessageRequest(body: string, answerToId: number | undefined, subjectBody: string) {
    const { id: userId } = await getUser();

    const { error } = await supabase
        .from('messages')
        .insert({
            body,
            authorId: userId,
            answerToId,
            subjectBody,
            updatedAt: new Date().toISOString(),
        });

    if (error) {
        console.error(error.message);
        throw new Error('Failed to add new message. Try again later.');
    }
}


export function useCreateMessageRequest({ answerToId }: { answerToId?: number }) {
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation<void, Error, IEditMessageInput & {subjectBody: string}>({
        async mutationFn({ body, subjectBody }) {
            await createMessageRequest(body, answerToId, subjectBody);
        },
        async onSuccess() {
            await queryClient.invalidateQueries({
                predicate: ({ queryKey }) => queryKey[0] === 'FIND_MESSAGES' satisfies FindMessagesQueryKey[0],
            });

            if (answerToId) await queryClient.setQueryData<IMessage>(
                ['FIND_MESSAGE', { messageId: answerToId }] satisfies FindMessageQueryKey,
                (oldMessage) => (oldMessage && ({ ...oldMessage, messagesCount: oldMessage.messagesCount + 1 })),
            );

            toast({ title: 'New message successfully added!', status: 'success' });
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}

