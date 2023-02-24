import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryName } from './constants';
import { createMessageRequest } from '~/requests';
import { IEditMessageInput, IMessage } from '~/types';


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
                [QueryName.FIND_MESSAGE, answerToId, undefined],
                (oldMessage) => (oldMessage && ({ ...oldMessage, messagesCount: oldMessage.messagesCount + 1 })),
            );

            toast({ title: 'New message successfully added!', status: 'success' });
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}

