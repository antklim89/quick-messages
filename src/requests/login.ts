import supabase from '~/supabase/app';
import type { IAuthInput } from '~/types';


export async function login(values: IAuthInput) {
    const { error, data } = await supabase.auth.signInWithPassword(values);

    if (error || !data.user) {
        throw new Error('Failed to login. Try again later.');
    }

    return data.user;
}
