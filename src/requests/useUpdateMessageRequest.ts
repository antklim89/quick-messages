import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import supabase from '~/supabase/app';
import { IEditMessageInput } from '~/types/message';


export function useUpdateMessageRequest({ answerToId }: { answerToId?: number; }) {
    const toast = useToast();

    return useMutation<void, Error, { messageId: number; values: IEditMessageInput; }>({
        async mutationFn({ values, messageId }) {
            const { data } = await supabase.auth.getSession();
            if (!data.session?.user.id) throw new Error('You are not authenticated');

            const { error } = await supabase
                .from('messages')
                .update({ ...values, answerTo: answerToId })
                .eq('id', messageId)
                .select('*, author(*)');

            if (error) throw new Error('Failed to update message. Try again later.');
        },
        async onSuccess() {
            toast({ title: 'Message successfully updated!', status: 'success' });
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}
