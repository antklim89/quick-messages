import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '~/supabase/app';


export function useLogoutRequest() {
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation<unknown, Error, unknown>({
        async mutationFn() {
            await supabase.auth.signOut();
        },
        async onSuccess() {
            await queryClient.invalidateQueries();
        },
        onError() {
            toast({ title: 'Failed to logout. Try again later.', status: 'error' });
        },
    });
}
