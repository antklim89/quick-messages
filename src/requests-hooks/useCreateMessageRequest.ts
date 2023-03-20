import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryName } from './constants';
import supabase from '~/supabase/app';
import { IEditMessageInput, IMessage } from '~/types';
import { getUser } from '~/utils';


export async function createMessageRequest(values: { body: string; }, answerToId: number | undefined) {
    const { id: userId } = await getUser();

    const { error, data } = await supabase
        .from('messages')
        .insert({
            ...values,
            authorId: userId,
            answerToId,
            updatedAt: new Date().toISOString(),
        })
        .single();

    if (error) {
        console.error(error.message);
        throw new Error('Failed to add new message. Try again later.');
    }

    return data;
}


export function useCreateMessageRequest({ answerToId }: { answerToId?: number }) {
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation<void, Error, { values: IEditMessageInput; }>({
        async mutationFn({ values }) {
            await createMessageRequest(values, answerToId);
        },
        async onSuccess() {
            await queryClient.invalidateQueries({
                predicate: ({ queryKey }) => queryKey[0] === QueryName.FIND_MESSAGES,
            });

            await queryClient.setQueryData<IMessage>(
                [QueryName.FIND_MESSAGE, answerToId],
                (oldMessage) => (oldMessage && ({ ...oldMessage, messagesCount: oldMessage.messagesCount + 1 })),
            );

            toast({ title: 'New message successfully added!', status: 'success' });
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}

