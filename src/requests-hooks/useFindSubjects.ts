import { useToast } from '@chakra-ui/react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ZodError } from 'zod';
import { subjectSchema } from '../schemas/subjectSchema';
import { ISubject } from '../types/subject';
import { QueryKey } from './constants';
import supabase from '~/supabase/app';


export async function findSubjects({ body }: { body?: string; } = {}) {
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


export function useFindSubjects({ body }: { body?: string; } = {}, options: UseQueryOptions<ISubject[], Error> = {}) {
    const toast = useToast();

    return useQuery<ISubject[], Error>({
        queryKey: ['SUBJECTS', body] satisfies QueryKey,
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

