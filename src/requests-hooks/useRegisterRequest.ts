import { useToast } from '@chakra-ui/react';
import { User } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { register } from '~/requests';
import { IAuthInput } from '~/types';


export function useRegisterRequest() {
    const toast = useToast();
    const queryClient = useQueryClient();

    return useMutation<User, Error, IAuthInput>({
        async mutationFn(values) {
            return register(values);
        },
        async onSuccess() {
            await queryClient.invalidateQueries();
            toast({ title: 'You have successfully registred!', status: 'success' });
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}
