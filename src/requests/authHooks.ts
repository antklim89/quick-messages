import { useToast } from '@chakra-ui/react';
import type { User } from '@supabase/supabase-js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryName } from './constants';
import supabase from '~/supabase/app';
import { IAuthInput } from '~/types';


export function useUser() {
    const { data: userId } = useQuery<string|null, Error>({
        queryKey: [QueryName.GET_USER],
        async queryFn() {
            const { data, error } = await supabase.auth.getSession();
            if (error) return null;
            if (!data.session?.user) return null;

            const { id } = data.session.user;

            return id;
        },
        onSuccess(id) {
            if (id) localStorage.setItem(QueryName.GET_USER, id);
        },
        placeholderData: () => localStorage.getItem(QueryName.GET_USER),
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
    const queryClient = useQueryClient();

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
            queryClient.invalidateQueries();
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}

export function useLoginRequest() {
    const toast = useToast();
    const queryClient = useQueryClient();

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
            queryClient.invalidateQueries();
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}

export function useLogoutRequest() {
    const queryClient = useQueryClient();

    return useMutation<unknown, Error, unknown>({
        async mutationFn() {
            await supabase.auth.signOut();
            queryClient.invalidateQueries();
        },
    });
}
