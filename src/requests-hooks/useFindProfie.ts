import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { ZodError } from 'zod';
import { QueryName } from './constants';
import { profileSchema } from '~/schemas';
import supabase from '~/supabase/app';
import { IProfile } from '~/types';
import { getUser } from '~/utils';


export async function findProfile({ profileId }: {profileId?: string}) {
    const id = profileId || (await getUser()).id;

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();


    if (error) {
        console.error(error.message);
        if (error) throw new Error('Failed to load profile. Try again later.');
    }

    return data;
}


export function useFindProfie({ profileId }: {profileId?: string} = {}) {
    const toast = useToast();

    return useQuery<IProfile, Error>({
        queryKey: [QueryName.PROFILE, profileId],
        async queryFn() {
            return findProfile({ profileId });
        },
        select(data) {
            return profileSchema.parse(data);
        },
        onError(error) {
            if (error instanceof ZodError) toast({ title: 'Unexpected server error. Try again later.', status: 'error' });
            else toast({ title: error.message, status: 'error' });
        },
    });
}
