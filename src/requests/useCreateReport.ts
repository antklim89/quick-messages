import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import createSupabaseClient from '~/supabase/app';


export async function createReport({ messageId, body }: { messageId: number; body: string; }) {
    const supabase = await createSupabaseClient();
    const { error } = await supabase
        .from('reports')
        .insert({ body, messageId })
        .select('body');

    if (error) {
        console.error(error.message);
        throw new Error('Failed to add new subject. Try again later.');
    }
}


export function useCreateReport({ messageId }: {messageId: number}) {
    const toast = useToast();

    return useMutation<void, Error, {body: string}>({
        async mutationFn({ body }) {
            await createReport({ messageId, body });
        },
        async onSuccess() {
            toast({ title: 'Report successfully sent.', status: 'success' });
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}

