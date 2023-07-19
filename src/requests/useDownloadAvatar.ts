import { useQuery } from '@tanstack/react-query';
import { AvatarDownloadQueryKey } from './constants';
import supabase from '~/supabase/app';


export function useAvatarDownload({ authorId }: {authorId?: string | null}) {
    return useQuery<string | null, Error>({
        queryKey: ['AVATAR_DOWNLOAD', { authorId }] satisfies AvatarDownloadQueryKey,
        async queryFn() {
            if (!authorId) return null;
            const { data } = await supabase.storage.from('avatar').download(`${authorId}/avatar`);
            if (!data) return null;
            return URL.createObjectURL(data);
        },
        enabled: Boolean(authorId),
    });
}
