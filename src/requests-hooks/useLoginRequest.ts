import { useToast } from '@chakra-ui/react';
import { User } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '~/supabase/app';
import type { IAuthInput } from '~/types';


export async function login(values: IAuthInput) {
    const { error, data } = await supabase.auth.signInWithPassword(values);

    if (error || !data.user) {
        console.error(error);
        throw new Error('Failed to login. Try again later.');
    }

    return data.user;
}


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
