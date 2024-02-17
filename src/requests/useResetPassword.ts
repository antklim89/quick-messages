import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import createSupabaseClient from '~/supabase/app';


export async function resetPasswordRequest({ email }: {email: string}) {
    const supabase = await createSupabaseClient();
    const { error } = await supabase
        .auth
        .resetPasswordForEmail(email);

    if (error) {
        console.error(error.message);
        if (error) throw new Error('Failed to add favorite message. Try again later.');
    }
}


export function useResetPassword() {
    const toast = useToast();

    return useMutation<void, Error, {email?: string}>({
        async mutationFn({ email }) {
            if (email) await resetPasswordRequest({ email });
            else toast({ title: 'Provide an email', status: 'error' });
        },
        onSuccess() {
            toast({ title: 'Password successfully changed.', status: 'success' });
        },
        onError() {
            toast({ title: 'Password change failed. Try again later.', status: 'error' });
        },
    });
}
