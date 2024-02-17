import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { SubscriptionsQueryKey } from './constants';
import { subscriptionSchema } from '~/schemas';
import createSupabaseClient from '~/supabase/app';
import { ISubscription } from '~/types';
import { getUser } from '~/utils';


async function findSubscriptions({ subjectBody }: { subjectBody?: string }) {
    const user = await getUser({ required: false });
    if (!user) return [];
    const supabase = await createSupabaseClient();

    const supabaseQuery = supabase
        .from('subscription')
        .select('*')
        .eq('userId', user.id);

    if (subjectBody) supabaseQuery.eq('subjectBody', subjectBody);

    const { error, data } = await supabaseQuery;

    if (error) {
        console.error(error.message);
        throw new Error('Failed to find subscriptions. Try again later.');
    }

    return subscriptionSchema.array().parseAsync(data);
}

type Options = Partial<UseQueryOptions<unknown, Error, ISubscription[], SubscriptionsQueryKey>>;
export function useFindSubscriptions({ subjectBody }: { subjectBody?: string }, options: Options = {}) {
    return useQuery<unknown, Error, ISubscription[], SubscriptionsQueryKey>({
        queryKey: ['SUBSCRIPTIONS', { subjectBody }],
        queryFn() {
            return findSubscriptions({ subjectBody });
        },
        ...options,
    });
}

