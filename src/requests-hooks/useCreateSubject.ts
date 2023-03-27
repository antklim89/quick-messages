import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryName } from './constants';
import { subjectBodySchema, subjectSchema } from '~/schemas';
import supabase from '~/supabase/app';
import { ISubject } from '~/types';


export async function createSubject(body: string) {
    const { error, data } = await supabase
        .from('subjects')
        .insert({ body })
        .select('body')
        .single();

    if (error) {
        console.error(error.message);
        throw new Error('Failed to add new subject. Try again later.');
    }

    return subjectSchema.parseAsync(data);
}


export function useCreateSubject() {
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation<ISubject, Error, { body: string }>({
        async mutationFn({ body }) {
            const validatedBody = await subjectBodySchema.parse(body);
            return createSubject(validatedBody);
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

