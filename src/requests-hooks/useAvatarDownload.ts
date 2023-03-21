import { useQuery } from '@tanstack/react-query';
import supabase from '~/supabase/app';


export function useAvatarDownload({ authorId }: {authorId: string}) {
    return useQuery<string | null, Error>({
        queryKey: ['AVATAR', authorId],
        async queryFn() {
            const { data } = await supabase.storage.from('avatar').download(`${authorId}/avatar.jpg`);
            if (!data) return null;
            return URL.createObjectURL(data);
        },
    });
}
