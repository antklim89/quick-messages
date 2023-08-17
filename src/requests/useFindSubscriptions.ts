import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { ZodError } from 'zod';
import { SubscriptionsQueryKey } from './constants';
import { subscriptionSchema } from '~/schemas';
import supabase from '~/supabase/app';
import { ISubscription } from '~/types';
import { getUser } from '~/utils';


async function findSubscriptions({ subjectBody }: { subjectBody?: string }) {
    const user = await getUser({ required: false });
    if (!user) return [];

    const supabaseQuery = supabase
        .from('subscribe')
        .select('*')
        .eq('userId', user.id)
        .eq('subjectBody', subjectBody);

    if (subjectBody) supabaseQuery.eq('subjectBody', subjectBody);

    const { error, data } = await supabaseQuery;

    if (error) {
        console.error(error.message);
        throw new Error('Failed to unlike message. Try again later.');
    }

    return subscriptionSchema.array().parseAsync(data);
}


export function useFindSubscriptions({ subjectBody }: { subjectBody?: string }) {
    const toast = useToast();

    return useQuery<unknown, Error, ISubscription[], SubscriptionsQueryKey>({
        queryKey: ['SUBSCRIPTIONS', { subjectBody }],
        queryFn() {
            return findSubscriptions({ subjectBody });
        },
        onError(error) {
            if (error instanceof ZodError) toast({ title: 'Unexpected server error. Try again later.', status: 'error' });
            else toast({ title: error.message, status: 'error' });
        },
    });
}

