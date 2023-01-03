import { useToast } from '@chakra-ui/react';
import { User } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '~/supabase/app';
import { IAuthInput } from '~/types';


export function useLoginRequest() {
    const toast = useToast();
    const queryClient = useQueryClient();

    return useMutation<User, Error, IAuthInput>({
        async mutationFn({ email, password }) {
            const { error, data } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error)
                throw error;
            if (!data.user)
                throw new Error('Login error.');

            return data.user;
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
