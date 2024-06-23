import { useQuery } from '@tanstack/react-query';
import { FindMessageQueryKey } from './constants';
import { messageSchema } from '~/schemas';
import createSupabaseClient from '~/supabase/app';
import { IMessage } from '~/types/message';
import { getUser, transformMessage } from '~/utils';


export async function findMessageRequest({ messageId }: {messageId: number}) {
    const supabase = await createSupabaseClient();
    const user = await getUser({ required: false });

    const { data = [], error } = await supabase
        .from('messages')
        .select('*, author:authorId(*), subject, messages(count), likes(userId), favorites(userId)')
        .eq('id', messageId);

    if (error) {
        console.error(error.message);
        throw new Error('Failed to load message. Try again later.');
    }

    if (!data || !data[0]) {
        throw new Error('Message not found.');
    }

    return messageSchema.parseAsync(transformMessage(data[0], user ? user.id : null));
}


export function useFindMessageRequest(messageId: number, initialData?: IMessage) {
    return useQuery<IMessage, Error, IMessage, FindMessageQueryKey>({
        retry: 0,
        staleTime: initialData ? Infinity : undefined,
        initialData,
        queryKey: ['FIND_MESSAGE', { messageId }],
        async queryFn() {
            return findMessageRequest({ messageId });
        },
    });
}
