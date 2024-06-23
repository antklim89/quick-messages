import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubscriptionsQueryKey } from './constants';
import createSupabaseClient from '~/supabase/app';
import { getUser } from '~/utils';


async function addSubscription({ subject }: { subject: string }) {
    const supabase = await createSupabaseClient();
    const { id: userId } = await getUser({ errorMessage: 'Log in to add subscription' });

    const { error } = await supabase
        .from('subscription')
        .insert({ subject, userId });

    if (error) {
        console.error(error.message);
        throw new Error('Failed to add subscription. Try again later.');
    }
}

async function removeSubscription({ subscriptionId }: { subscriptionId: number }) {
    const supabase = await createSupabaseClient();
    const { id: userId } = await getUser({ errorMessage: 'Log in to add subscription' });

    const { error } = await supabase
        .from('subscription')
        .delete()
        .eq('id', subscriptionId)
        .eq('userId', userId);

    if (error) {
        console.error(error.message);
        throw new Error('Failed to remove subscription. Try again later.');
    }
}


export function useAddRemoveSubscription({
    subject,
    subscriptionId,
}: {
     subject?: string,
     subscriptionId?: number
}) {
    const toast = useToast();
    const queryClient = useQueryClient();

    return useMutation<void, Error, void>({
        async mutationFn() {
            if (subscriptionId) await removeSubscription({ subscriptionId });
            else if (subject) await addSubscription({ subject });
        },
        async onSuccess() {
            await queryClient.invalidateQueries({
                predicate(query) {
                    return query.queryKey[0] === 'SUBSCRIPTIONS' satisfies SubscriptionsQueryKey[0];
                },
            });
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}
