import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { QueryName } from './constants';
import { findProfile } from '~/requests';
import { profileSchema } from '~/schemas';
import { IProfile } from '~/types';


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
