import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { updateMessageRequest } from '~/requests';
import { IEditMessageInput } from '~/types';


export function useUpdateMessageRequest({ answerToId }: { answerToId?: number; }) {
    const toast = useToast();

    return useMutation<void, Error, { messageId: number; values: IEditMessageInput; }>({
        async mutationFn({ values, messageId }) {
            await updateMessageRequest({ messageId, answerToId, values });
        },
        async onSuccess() {
            toast({ title: 'Message successfully updated!', status: 'success' });
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}
