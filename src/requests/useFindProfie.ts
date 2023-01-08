import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { QueryName } from './constants';
import { useUser } from './useUser';
import { profileSchema } from '~/schemas';
import supabase from '~/supabase/app';
import { IProfile } from '~/types';


export function useFindProfie() {
    const { id: userId } = useUser();
    const toast = useToast();

    return useQuery<IProfile, Error>({
        queryKey: [QueryName.PROFILE],
        async queryFn() {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) throw error;

            return data;
        },
        select(data) {
            return profileSchema.parse(data);
        },
        onError() {
            toast({ title: 'Failed to load profile. Try again later.', status: 'error' });
        },
    });
}
