import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { ZodError } from 'zod';
import { subjectSchema } from '../schemas/subjectSchema';
import { ISubject } from '../types/subject';
import { QueryName } from './constants';
import supabase from '~/supabase/app';


export async function findSubjects({ body }: { body?: string; } = {}) {
    const query = supabase
        .from('subjects')
        .select('body')
        .limit(50);

    if (body) query.ilike('body', `%${body}%`);

    const { error, data = [] } = await query;

    if (error) {
        console.error(error.message);
    }

    return subjectSchema.array().parseAsync(data);
}


export function useFindSubjects({ body }: { body?: string; } = {}) {
    const toast = useToast();

    return useQuery<ISubject[], Error>({
        queryKey: [QueryName.SUBJECTS],
        async queryFn() {
            return findSubjects({ body });
        },
        onError(error) {
            if (error instanceof ZodError) toast({ title: 'Unexpected server error. Try again later.', status: 'error' });
            else toast({ title: error.message, status: 'error' });
        },
    });
}

