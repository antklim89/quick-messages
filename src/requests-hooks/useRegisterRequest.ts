import { useToast } from '@chakra-ui/react';
import { User } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '~/supabase/app';
import type { IAuthInput } from '~/types';


export async function register(values: IAuthInput) {
    const { data, error } = await supabase.auth.signUp(values);

    if (error || !data.user) {
        console.error(error);
        throw new Error('Failed to register. Try again later.');
    }

    return data.user;
}


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
