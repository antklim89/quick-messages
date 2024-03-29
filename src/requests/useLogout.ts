import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import createSupabaseClient from '~/supabase/app';


export function useLogoutRequest() {
    const toast = useToast();

    return useMutation<unknown, Error, unknown>({
        async mutationFn() {
            const supabase = await createSupabaseClient();
            await supabase.auth.signOut();
        },
        async onSuccess() {
            toast({ title: 'You have successfully log out!', status: 'success' });
            window.location.reload();
        },
        onError() {
            toast({ title: 'Failed to logout. Try again later.', status: 'error' });
        },
    });
}
