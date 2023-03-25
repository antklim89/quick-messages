import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryName } from './constants';
import supabase from '~/supabase/app';
import { getUser } from '~/utils';


export async function avatarUpload(file: File) {
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

    return useMutation<File|null, Error, FileList | null | undefined>({
        async mutationFn(files) {
            if (!files) return null;
            const [file] = [...files];
            if (!file) return null;
            await avatarUpload(file);
            return file;
        },
        async onSuccess(file) {
            const { id: userId } = await getUser();

            await queryClient.setQueryData<string>(
                [QueryName.AVATAR_DOWNLOAD, userId],
                (oldMessage) => (file ? URL.createObjectURL(file) : oldMessage),
            );
            toast({ title: 'Avatar succesfully uploaded.', status: 'success' });
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}

