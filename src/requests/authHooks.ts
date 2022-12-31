import { useToast } from '@chakra-ui/react';
import type { User } from '@supabase/supabase-js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { USER_AUTH_ID } from './queryKeys';
import supabase from '~/supabase/app';
import { IAuthInput } from '~/types';


export function useUser() {
    const { data: userId } = useQuery<string|null, Error>({
        queryKey: [USER_AUTH_ID],
        async queryFn() {
            const { data, error } = await supabase.auth.getSession();
            if (error) return null;
            if (!data.session?.user) return null;

            const { id } = data.session.user;

            return id;
        },
        onSuccess(id) {
            if (id) localStorage.setItem(USER_AUTH_ID, id);
        },
        placeholderData: () => localStorage.getItem(USER_AUTH_ID),
    });

    return {
        id: userId,
        isAuth: Boolean(userId),
        getUserId() {
            if (!userId) throw new Error('No user logged in.');
            return userId;
        },
    };
}

export function useRegisterRequest() {
    const toast = useToast();

    return useMutation<User, Error, IAuthInput>({
        async mutationFn({ email, password }) {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) throw error;
            if (!data.user) throw new Error('Register error.');

            return data.user;
        },
        onSuccess() {
            toast({ title: 'You have successfully registred!', status: 'success' });
            window.location.reload();
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}

export function useLoginRequest() {
    const toast = useToast();

    return useMutation<User, Error, IAuthInput>({
        async mutationFn({ email, password }) {
            const { error, data } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            if (!data.user) throw new Error('Login error.');

            return data.user;
        },
        onSuccess() {
            toast({ title: 'You have successfully logged in!', status: 'success' });
            window.location.reload();
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}

export function useLogoutRequest() {
    return useMutation<unknown, Error, unknown>({
        async mutationFn() {
            await supabase.auth.signOut();
            window.location.reload();
        },
    });
}
