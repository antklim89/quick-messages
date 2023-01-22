import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { resetPasswordRequest } from '~/requests';


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
