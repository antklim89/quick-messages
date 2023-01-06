import { useQuery } from '@tanstack/react-query';
import { QueryName } from './constants';
import { messageSchema } from '~/schemas';
import supabase from '~/supabase/app';
import { IMessage } from '~/types/message';


export function useFindMessageRequest(id: number, initialData?: IMessage) {
    return useQuery<IMessage>({
        initialData,
        queryKey: [QueryName.FIND_MESSAGE, id],
        async queryFn() {
            const { data, error } = await supabase
                .from('messages')
                .select('*, author(*), messages(count), likes(count)')
                .eq('id', id)
                .single();

            if (error) throw error;

            return messageSchema.parseAsync({
                ...data,
                messagesCount: Array.isArray(data.messages) ? data.messages[0]?.count : data.messages?.count,
                likesCount: Array.isArray(data.likes) ? data.likes[0]?.count : data.likes?.count,
            });
        },
        staleTime: initialData ? Infinity : undefined,
    });
}
