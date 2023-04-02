import { useToast } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ZodError } from 'zod';
import { MESSAGES_LIMIT, QueryKey } from './constants';
import { messageSchema } from '~/schemas';
import supabase from '~/supabase/app';
import { IMessage, IMessageParams } from '~/types/message';
import { getUser, transformMessage } from '~/utils';


interface FindMessagesArguments extends IMessageParams {
    lastId?: number;
}

export async function findMessagesRequest({ answerToId, lastId, authorId, subjectBody }: FindMessagesArguments) {
    const supabaseQuery = supabase
        .from('messages')
        .select('*, author:authorId(id, name, avatarUrl), subject:subjectBody(body), messages(count), likes(userId), favorites(userId)')
        .range(0, MESSAGES_LIMIT - 1)
        .order('id', { ascending: false });

    if (lastId) supabaseQuery.lt('id', lastId);
    if (authorId) supabaseQuery.eq('authorId', authorId);
    if (subjectBody) supabaseQuery.eq('subjectBody', subjectBody);

    if (answerToId) supabaseQuery.eq('answerToId', answerToId);
    else supabaseQuery.is('answerToId', null);

    const { data, error } = await supabaseQuery;

    if (error) {
        console.error(error.message);
        if (error) throw new Error('Failed to load messages. Try again later.');
    }

    return data;
}


export function useFindMessagesRequest({ answerToId, subjectBody, authorId }: IMessageParams) {
    const toast = useToast();

    return useInfiniteQuery<IMessage[], Error, IMessage[], QueryKey>({
        queryKey: ['FIND_MESSAGES', answerToId, authorId, subjectBody],
        async queryFn({ pageParam: lastId }) {
            const user = await getUser({ required: false });
            const data = await findMessagesRequest({ answerToId, subjectBody, authorId, lastId });

            return messageSchema.array().parseAsync(data.map((i) => transformMessage(i, user ? user.id : null)));
        },
        getNextPageParam(lastPage) {
            return lastPage.slice().pop()?.id;
        },
        onError(error) {
            if (error instanceof ZodError) toast({ title: 'Unexpected error. Try again later.', status: 'error' });
            else toast({ title: error.message, status: 'error' });
        },
    });
}
