import { useQuery } from '@tanstack/react-query';
import { QueryName } from './constants';
import { useUser } from './useUser';
import { messageSchema } from '~/schemas';
import supabase from '~/supabase/app';
import { IMessage } from '~/types/message';
import { transformMessage } from '~/utils';


export function useFindMessageRequest(id: number, initialData?: IMessage) {
    const { id: userId } = useUser();

    return useQuery<IMessage>({
        initialData,
        queryKey: [QueryName.FIND_MESSAGE, id],
        async queryFn() {
            const { data, error } = await supabase
                .from('messages')
                .select('*, author(*), messages(count), likes(user)')
                .eq('id', id)
                .single();

            if (error) throw error;

            return messageSchema.parseAsync(transformMessage(data, userId));
        },
        staleTime: initialData ? Infinity : undefined,
    });
}
