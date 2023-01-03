import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '~/supabase/app';


export function useLogoutRequest() {
    const queryClient = useQueryClient();

    return useMutation<unknown, Error, unknown>({
        async mutationFn() {
            await supabase.auth.signOut();
            queryClient.invalidateQueries();
        },
    });
}
