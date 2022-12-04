import type { AuthResponse } from '@supabase/supabase-js';
import supabase from './app';
import { LoginInput, RegisterInput } from '~/types';


export async function registerRequest({ email, password, name }: RegisterInput): Promise<AuthResponse> {
    return supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
    });
}

export async function loginRequest({ email, password }: LoginInput): Promise<AuthResponse> {
    return supabase.auth.signInWithPassword({
        email,
        password,
    });
}

export async function logoutRequest() {
    return supabase.auth.signOut();
}
