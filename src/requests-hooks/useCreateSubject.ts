import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryName } from './constants';
import supabase from '~/supabase/app';


export async function createSubject(body: string) {
    const { error } = await supabase
        .from('subjects')
        .insert({ body });

    if (error) {
        console.error(error.message);
        throw new Error('Failed to add new subject. Try again later.');
    }
}


export function useCreateSubject() {
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation<void, Error, { body: string }>({
        async mutationFn({ body }) {
            await createSubject(body);
        },
        async onSuccess() {
            await queryClient.invalidateQueries([QueryName.SUBJECTS]);

            toast({ title: 'New subject successfully added!', status: 'success' });
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}

