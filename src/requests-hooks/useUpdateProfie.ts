import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKey } from './constants';
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
                ['PROFILE'] satisfies QueryKey,
                (oldProfile) => (oldProfile && ({ ...oldProfile, ...newProfile })),
            );

            toast({ title: 'Profile successfully updated', status: 'success' });
        },
    });
}
