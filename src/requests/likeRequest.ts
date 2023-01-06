import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from './useUser';
import supabase from '~/supabase/app';


export function useLikeRequest({ message }: {message: number}) {
    const { id: userId } = useUser();
    const toast = useToast();
    const queryClient = useQueryClient();

    return useMutation<void, Error, void>({
        async mutationFn() {
            if (!userId) throw new Error('You are not authenticated');

            const { error } = await supabase
                .from('likes')
                .insert({ message, user: userId });
            if (error) throw error;
        },
        onSuccess() {
            toast({ title: 'You have successfully logged in!', status: 'success' });
            queryClient.invalidateQueries();
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}
