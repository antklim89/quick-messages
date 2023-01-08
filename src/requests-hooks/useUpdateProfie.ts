import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryName } from './constants';
import { updateProfile } from '~/requests';
import { IProfile } from '~/types';


export function useUpdateProfie() {
    const toast = useToast();
    const queryClient = useQueryClient();

    return useMutation<void, Error, IProfile>({
        async mutationFn(values) {
            await updateProfile(values);
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
