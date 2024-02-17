import { keepPreviousData, useQuery, UseQueryOptions } from '@tanstack/react-query';
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
        throw new Error('Failed to find subjects. Try again later.');
    }

    return subjectSchema.array().parseAsync(data?.map((i) => i.body));
}


type Options = Partial<UseQueryOptions<ISubject[], Error, ISubject[], SubjectsQueryKey>>;

export function useFindSubjects({ body }: { body?: string; } = {}, options: Options = {}) {
    return useQuery<ISubject[], Error, ISubject[], SubjectsQueryKey>({
        queryKey: ['SUBJECTS', { body }],
        async queryFn() {
            return findSubjects({ body });
        },
        placeholderData: keepPreviousData,
        ...options,
    });
}


