import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FindMessageQueryKey } from './constants';
import createSupabaseClient from '~/supabase/app';
import { IEditMessageInput, IMessage, ISubject } from '~/types';
import { getUser } from '~/utils';


interface Arguments {
    messageId: number;
    values: IEditMessageInput;
    answerToId?: number;
}

export async function updateMessageRequest({ values, messageId, answerToId }: Arguments) {
    const supabase = await createSupabaseClient();
    const { id: userId } = await getUser({ errorMessage: 'Login to update message' });

    const { error, data } = await supabase
        .from('messages')
        .update({ ...values, answerTo: answerToId })
        .eq('id', messageId)
        .eq('authorId', userId)
        .select('body, subject:subject');


    if (error || data.length === 0) {
        if (error) console.error(error.message);
        throw new Error('Failed to update message. Try again later.');
    }

    return data[0] as {body: string, subject: string};
}


export function useUpdateMessageRequest({ answerToId }: { answerToId?: number; }) {
    const toast = useToast();
    const queryClient = useQueryClient();

    return useMutation<{body: string, subject: ISubject}, Error, { messageId: number; values: IEditMessageInput; }>({
        async mutationFn({ values, messageId }) {
            return updateMessageRequest({ messageId, answerToId, values });
        },
        async onSuccess(values, { messageId }) {
            toast({ title: 'Message successfully updated!', status: 'success' });

            await queryClient.setQueryData<IMessage>(
                ['FIND_MESSAGE', { messageId }] satisfies FindMessageQueryKey,
                (oldMessage) => (oldMessage && ({ ...oldMessage, ...values })),
            );
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}
