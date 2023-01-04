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
                .select('*, author(*), messages(id)')
                .eq('id', id)
                .single();

            if (error) throw error;

            return messageSchema.parseAsync(data);
        },
        staleTime: initialData ? Infinity : undefined,
    });
}
