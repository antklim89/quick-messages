import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { ZodError } from 'zod';
import { ProfileQueryKey } from './constants';
import { useUser } from './useUser';
import { profileSchema } from '~/schemas';
import createSupabaseClient from '~/supabase/app';
import { IProfile } from '~/types';


export async function findProfile({ profileId }: {profileId?: string}) {
    if (!profileId) return null;
    const supabase = await createSupabaseClient();

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', profileId)
        .single();


    if (error) {
        console.error(error.message);
        if (error) throw new Error('Failed to load profile. Try again later.');
    }

    return profileSchema.parse(data);
}


export function useFindProfie({ profileId }: { profileId?: string } = {}) {
    const user = useUser();
    const toast = useToast();
    const userId = profileId || user.id || undefined;

    return useQuery<unknown, Error, IProfile|null, ProfileQueryKey>({
        enabled: Boolean(userId),
        queryKey: ['PROFILE', { profileId: userId }],
        async queryFn() {
            return findProfile({ profileId: userId });
        },
        onError(error) {
            if (error instanceof ZodError) toast({ title: 'Unexpected error. Try again later.', status: 'error' });
            else toast({ title: error.message, status: 'error' });
        },
    });
}
