import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import supabase from '~/supabase/app';
import { getUser } from '~/utils';


export async function avatarUpload(file: File) {
    const { id: userId } = await getUser();

    const { error, data } = await supabase
        .storage
        .from('avatar')
        .upload(`${userId}/avatar.jpg`, file, { upsert: true });

    if (error) {
        console.error(error.message);
        throw new Error('Failed to upload avatar. Try again later.');
    }

    return data;
}


export function useAvatarUpload() {
    const toast = useToast();

    return useMutation<void, Error, FileList | null | undefined>({
        async mutationFn(files) {
            if (!files) return;
            const [file] = [...files];
            if (!file) return;
            await avatarUpload(file);
        },
        async onSuccess() {
            toast({ title: 'Avatar succesfully uploaded.', status: 'success' });
        },
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}

