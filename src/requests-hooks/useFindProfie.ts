import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { QueryName } from './constants';
import { profileSchema } from '~/schemas';
import supabase from '~/supabase/app';
import { IProfile } from '~/types';
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


export function useFindProfie() {
    const toast = useToast();

    return useQuery<IProfile, Error>({
        queryKey: [QueryName.PROFILE],
        async queryFn() {
            return findProfile();
        },
        select(data) {
            return profileSchema.parse(data);
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}
