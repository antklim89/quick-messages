import type { User } from '@supabase/supabase-js';
import supabase from '~/supabase/app';
import { IAuthInput } from '~/types';


export async function registerRequest({ email, password }: IAuthInput): Promise<User> {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });
    if (error) throw error;
    if (!data.user) throw new Error('Register error.');

    return data.user;
}

export async function loginRequest({ email, password }: IAuthInput): Promise<void> {
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) throw error;
}

export async function logoutRequest(): Promise<void> {
    await supabase.auth.signOut();
}
