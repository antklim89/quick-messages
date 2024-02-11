import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProfileQueryKey } from './constants';
import supabase from '~/supabase/app';
import { IProfile } from '~/types';
import { getUser } from '~/utils';
import { resizeImage } from '~/utils/resizeImage';


export async function avatarUpload(file: File|Blob) {
    const { id: userId } = await getUser();

    const { error, data } = await supabase
        .storage
        .from('avatar')
        .upload(`${userId}/avatar`, file, { upsert: true });

    const { data: { publicUrl: avatarUrl } } = supabase.storage.from('avatar').getPublicUrl(`${userId}/avatar`);

    await supabase.from('profiles').update({ avatarUrl }).eq('id', userId);

    if (error) {
        console.error(error.message);
        throw new Error('Failed to upload avatar. Try again later.');
    }

    return data;
}


export function useAvatarUpload() {
    const toast = useToast();
    const queryClient = useQueryClient();

    return useMutation<File|Blob, Error, File>({
        async mutationFn(file) {
            const resizedImage = await resizeImage(file);
            await avatarUpload(resizedImage);
            return file;
        },
        async onSuccess(file) {
            const { id: userId } = await getUser();

            await queryClient.setQueryData<IProfile>(
                ['PROFILE', { profileId: userId }] satisfies ProfileQueryKey,
                (profile) => (profile && file) && ({
                    ...profile,
                    avatarUrl: URL.createObjectURL(file),
                }),
            );
            toast({ title: 'Avatar succesfully uploaded.', status: 'success' });
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}

