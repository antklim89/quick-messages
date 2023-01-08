import supabase from '~/supabase/app';
import type { IAuthInput } from '~/types';


export async function register(values: IAuthInput) {
    const { data, error } = await supabase.auth.signUp(values);

    if (error || !data.user) {
        throw new Error('Failed to register. Try again later.');
    }

    return data.user;
}
