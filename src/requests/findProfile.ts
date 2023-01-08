import supabase from '~/supabase/app';
import { getUser } from '~/utils';


export async function findProfile() {
    const { id: userId } = await getUser();

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();


    if (error) {
        console.error(error.message);
        if (error) throw new Error('Failed to load profile. Try again later.');
    }

    return data;
}
