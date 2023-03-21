import { useQuery } from '@tanstack/react-query';
import { QueryName } from './constants';
import supabase from '~/supabase/app';


export function useAvatarDownload({ authorId }: {authorId?: string | null}) {
    return useQuery<string | null, Error>({
        queryKey: [QueryName.AVATAR_DOWNLOAD, authorId],
        async queryFn() {
            if (!authorId) return null;
            const { data } = await supabase.storage.from('avatar').download(`${authorId}/avatar.jpg`);
            if (!data) return null;
            return URL.createObjectURL(data);
        },
        enabled: Boolean(authorId),
    });
}
