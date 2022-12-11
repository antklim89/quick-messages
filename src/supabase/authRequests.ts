import { User } from '@supabase/supabase-js';
import supabase from './app';
import { LoginInput, RegisterInput } from '~/types';


export async function registerRequest({ email, password, name }: RegisterInput): Promise<User> {
    const signUp = await supabase.auth.signUp({
        email,
        password,
    });
    if (signUp.error) throw signUp.error;
    if (!signUp.data.user) throw new Error('Register error.');

    const profile = await supabase.from('profiles').insert({
        id: signUp.data.user.id,
        name,
    });
    if (profile.error) throw profile.error;

    return signUp.data.user;
}

export async function loginRequest({ email, password }: LoginInput): Promise<void> {
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) throw error;
}

export async function logoutRequest(): Promise<void> {
    await supabase.auth.signOut();
}
