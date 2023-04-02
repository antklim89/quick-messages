import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ZodError } from 'zod';
import { QueryKey } from './constants';
import { subjectBodySchema } from '~/schemas';
import supabase from '~/supabase/app';
import { ISubject } from '~/types';


export async function createSubject(body: string) {
    const validatedBody = await subjectBodySchema.parse(body);

    const { error } = await supabase
        .from('subjects')
        .insert({ body: validatedBody })
        .select('body');

    if (error) {
        console.error(error.message);
        throw new Error('Failed to add new subject. Try again later.');
    }
}


export function useCreateSubject() {
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation<void, Error, ISubject>({
        async mutationFn({ body }) {
            await createSubject(body);
        },
        async onSuccess() {
            await queryClient.invalidateQueries(['SUBJECTS'] satisfies QueryKey);

            toast({ title: 'New subject successfully added!', status: 'success' });
        },
        onError(error) {
            if (error instanceof ZodError) toast({ title: 'Unexpected error. Try again later.', status: 'error' });
            else toast({ title: error.message, status: 'error' });
        },
    });
}

