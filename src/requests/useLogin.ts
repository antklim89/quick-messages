import { useToast } from '@chakra-ui/react';
import { User } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';
import createSupabaseClient from '~/supabase/app';
import type { IAuthInput } from '~/types';


export async function login(values: IAuthInput) {
    const supabase = await createSupabaseClient();
    const { error, data } = await supabase.auth.signInWithPassword(values);

    if (error || !data.user) {
        console.error(error);
        throw new Error('Failed to login. Try again later.');
    }

    return data.user;
}


export function useLoginRequest() {
    const toast = useToast();

    return useMutation<User, Error, IAuthInput>({
        async mutationFn(values) {
            return login(values);
        },
        async onSuccess() {
            toast({ title: 'You have successfully logged in!', status: 'success' });
            window.location.reload();
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}
