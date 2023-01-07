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
            if (error || !data.user) throw new Error('Failed to login. Try again later.');

            return data.user;
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
