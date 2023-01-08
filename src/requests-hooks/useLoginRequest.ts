import { useToast } from '@chakra-ui/react';
import { User } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '~/requests';
import { IAuthInput } from '~/types';


export function useLoginRequest() {
    const toast = useToast();
    const queryClient = useQueryClient();

    return useMutation<User, Error, IAuthInput>({
        async mutationFn(values) {
            return login(values);
        },
        async onSuccess() {
            await queryClient.invalidateQueries();
            toast({ title: 'You have successfully logged in!', status: 'success' });
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}
