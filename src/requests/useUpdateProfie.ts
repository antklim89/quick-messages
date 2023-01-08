import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryName } from './constants';
import { useUser } from './useUser';
import supabase from '~/supabase/app';
import { IProfile } from '~/types';


export function useUpdateProfie() {
    const { id: userId } = useUser();
    const toast = useToast();
    const queryClient = useQueryClient();

    return useMutation<void, Error, IProfile>({
        async mutationFn(values) {
            const { error } = await supabase
                .from('profiles')
                .update(values)
                .eq('id', userId);

            if (error) throw error;
        },
        onError() {
            toast({ title: 'Failed to update profile. Try again later.', status: 'error' });
        },
        async onSuccess(_, newProfile) {
            await queryClient.setQueryData<IProfile>(
                [QueryName.PROFILE],
                (oldProfile) => (oldProfile && ({ ...oldProfile, ...newProfile })),
            );

            toast({ title: 'Profile successfully updated', status: 'success' });
        },
    });
}
