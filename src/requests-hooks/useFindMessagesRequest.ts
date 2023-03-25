import { useToast } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ZodError } from 'zod';
import { QueryName, MESSAGES_LIMIT } from './constants';
import { messageSchema } from '~/schemas';
import supabase from '~/supabase/app';
import { IMessage } from '~/types/message';
import { getUser, transformMessage } from '~/utils';


interface FindMessagesArguments {
    lastId?: number;
    answerToId?: number;
    authorId?: string;
}

export async function findMessagesRequest({ answerToId, lastId, authorId }: FindMessagesArguments) {
    const supabaseQuery = supabase
        .from('messages')
        .select('*, author:authorId(id, name, avatarUrl), subject:subjectId(id, body), messages(count), likes(userId), favorites(userId)')
        .range(0, MESSAGES_LIMIT - 1)
        .order('id', { ascending: false });

    if (lastId) supabaseQuery.lt('id', lastId);
    if (authorId) supabaseQuery.eq('authorId', authorId);

    if (answerToId) supabaseQuery.eq('answerToId', answerToId);
    else supabaseQuery.is('answerToId', null);

    const { data, error } = await supabaseQuery;

    if (error) {
        console.error(error.message);
        if (error) throw new Error('Failed to load messages. Try again later.');
    }

    return data;
}


export function useFindMessagesRequest({ answerToId, authorId }: { answerToId?: number; authorId?: string } = {}) {
    const toast = useToast();

    return useInfiniteQuery<IMessage[], Error>({
        queryKey: [QueryName.FIND_MESSAGES, answerToId, authorId],
        async queryFn({ pageParam: lastId }) {
            const user = await getUser({ required: false });
            const data = await findMessagesRequest({ answerToId, authorId, lastId });

            return messageSchema.array().parseAsync(data.map((i) => transformMessage(i, user ? user.id : null)));
        },
        getNextPageParam(lastPage) {
            return lastPage.slice().pop()?.id;
        },
        onError(error) {
            if (error instanceof ZodError) toast({ title: 'Unexpected server error. Try again later.', status: 'error' });
            else toast({ title: error.message, status: 'error' });
        },
    });
}
