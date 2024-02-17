import { useToast } from '@chakra-ui/react';
import { User } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';
import createSupabaseClient from '~/supabase/app';
import type { IAuthInput } from '~/types';


export async function register(values: IAuthInput) {
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase.auth.signUp(values);

    if (error || !data.user) {
        console.error(error);
        throw new Error('Failed to register. Try again later.');
    }

    return data.user;
}


export function useRegisterRequest() {
    const toast = useToast();

    return useMutation<User, Error, IAuthInput>({
        async mutationFn(values) {
            return register(values);
        },
        async onSuccess() {
            toast({ title: 'You have successfully registred!', status: 'success' });
            window.location.reload();
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}
