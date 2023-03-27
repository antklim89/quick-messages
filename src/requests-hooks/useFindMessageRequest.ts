import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { ZodError } from 'zod';
import { QueryName } from './constants';
import { messageSchema } from '~/schemas';
import supabase from '~/supabase/app';
import { IMessage } from '~/types/message';
import { getUser, transformMessage } from '~/utils';


export async function findMessageRequest({ messageId }: {messageId: number}) {
    const { data, error } = await supabase
        .from('messages')
        .select('*, author:authorId(*), subject:subjectBody(id, body), messages(count), likes(userId), favorites(userId)')
        .eq('id', messageId)
        .single();


    if (error) {
        console.error(error.message);
        if (error) throw new Error('Failed to load message. Try again later.');
    }

    return data;
}


export function useFindMessageRequest(messageId: number, initialData?: IMessage) {
    const toast = useToast();

    return useQuery<IMessage, Error>({
        initialData,
        queryKey: [QueryName.FIND_MESSAGE, messageId],
        async queryFn() {
            const user = await getUser({ required: false });
            const data = await findMessageRequest({ messageId });

            return messageSchema.parseAsync(transformMessage(data, user ? user.id : null));
        },
        staleTime: initialData ? Infinity : undefined,
        onError(error) {
            if (error instanceof ZodError) toast({ title: 'Unexpected server error. Try again later.', status: 'error' });
            else toast({ title: error.message, status: 'error' });
        },
    });
}
