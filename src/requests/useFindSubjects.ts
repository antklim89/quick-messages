import { useToast } from '@chakra-ui/react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ZodError } from 'zod';
import { SubjectsQueryKey } from './constants';
import { subjectSchema } from '~/schemas/subjectSchema';
import createSupabaseClient from '~/supabase/app';
import { ISubject } from '~/types/subject';


export async function findSubjects({ body }: { body?: string; } = {}) {
    const supabase = await createSupabaseClient();
    const query = supabase
        .from('subjects')
        .select('body')
        .limit(10);

    if (body) query.ilike('body', `%${body}%`);

    const { error, data = [] } = await query;

    if (error) {
        console.error(error.message);
    }

    return subjectSchema.array().parseAsync(data);
}


type Options = UseQueryOptions<ISubject[], Error, ISubject[], SubjectsQueryKey>;

export function useFindSubjects({ body }: { body?: string; } = {}, options: Options = {}) {
    const toast = useToast();

    return useQuery<ISubject[], Error, ISubject[], SubjectsQueryKey>({
        queryKey: ['SUBJECTS', { body }],
        async queryFn() {
            return findSubjects({ body });
        },
        onError(error) {
            if (error instanceof ZodError) toast({ title: 'Unexpected server error. Try again later.', status: 'error' });
            else toast({ title: error.message, status: 'error' });
        },
        keepPreviousData: true,
        ...options,
    });
}


