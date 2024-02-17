import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ZodError } from 'zod';
import { SubjectsQueryKey } from './constants';
import { subjectBodySchema } from '~/schemas';
import createSupabaseClient from '~/supabase/app';
import { ISubject } from '~/types';


export async function createSubject(subject: string) {
    const supabase = await createSupabaseClient();
    const validatedBody = await subjectBodySchema.parse(subject);

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
        async mutationFn(subject) {
            await createSubject(subject);
        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['SUBJECTS', {}] satisfies SubjectsQueryKey });

            toast({ title: 'New subject successfully added!', status: 'success' });
        },
        onError(error) {
            if (error instanceof ZodError) toast({ title: 'Unexpected error. Try again later.', status: 'error' });
            else toast({ title: error.message, status: 'error' });
        },
    });
}

