import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryName } from './constants';
import supabase from '~/supabase/app';
import { IEditMessageInput, IMessage } from '~/types';
import { getUser } from '~/utils';


interface Arguments {
    messageId: number;
    values: IEditMessageInput;
    answerToId?: number;
}

export async function updateMessageRequest({ values, messageId, answerToId }: Arguments) {
    const { id: userId } = await getUser({ errorMessage: 'Login to update message' });

    const { error } = await supabase
        .from('messages')
        .update({ ...values, answerTo: answerToId })
        .eq('id', messageId)
        .eq('authorId', userId);


    if (error) {
        console.error(error.message);
        if (error) throw new Error('Failed to update message. Try again later.');
    }
}


export function useUpdateMessageRequest({ answerToId }: { answerToId?: number; }) {
    const toast = useToast();
    const queryClient = useQueryClient();

    return useMutation<void, Error, { messageId: number; values: IEditMessageInput; }>({
        async mutationFn({ values, messageId }) {
            await updateMessageRequest({ messageId, answerToId, values });
        },
        async onSuccess(_, { messageId, values }) {
            toast({ title: 'Message successfully updated!', status: 'success' });

            await queryClient.setQueryData<IMessage>(
                [QueryName.FIND_MESSAGE, messageId],
                (oldMessage) => (oldMessage && ({ ...oldMessage, ...values })),
            );
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}
