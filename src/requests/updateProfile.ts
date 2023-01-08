import supabase from '~/supabase/app';
import { IProfile } from '~/types';
import { getUser } from '~/utils';


export async function updateProfile(values: IProfile) {
    const { id: userId } = await getUser({ errorMessage: 'Login to like message' });

    const { error } = await supabase
        .from('profiles')
        .update(values)
        .eq('id', userId);


    if (error) {
        console.error(error.message);
        if (error) throw new Error('Failed to update profile. Try again later.');
    }
}
