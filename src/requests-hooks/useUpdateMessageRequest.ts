import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKey } from './constants';
import supabase from '~/supabase/app';
import { IEditMessageInput, IMessage, ISubject } from '~/types';
import { getUser } from '~/utils';


interface Arguments {
    messageId: number;
    values: IEditMessageInput;
    answerToId?: number;
}

export async function updateMessageRequest({ values, messageId, answerToId }: Arguments) {
    const { id: userId } = await getUser({ errorMessage: 'Login to update message' });

    const { error, data } = await supabase
        .from('messages')
        .update({ ...values, answerTo: answerToId })
        .eq('id', messageId)
        .eq('authorId', userId)
        .select('body, subject:subjectBody(body)')
        .single();

    if (error) {
        console.error(error.message);
        if (error) throw new Error('Failed to update message. Try again later.');
    }

    return data as {body: string, subject: ISubject};
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
                ['FIND_MESSAGE', messageId] satisfies QueryKey,
                (oldMessage) => (oldMessage && ({ ...oldMessage, ...values })),
            );
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}
