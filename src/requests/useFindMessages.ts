import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { FindMessagesQueryKey, MESSAGES_LIMIT } from './constants';
import { messageSchema } from '~/schemas';
import createSupabaseClient from '~/supabase/app';
import { IMessage, IMessageParams } from '~/types/message';
import { getUser, transformMessage } from '~/utils';


interface FindMessagesArguments extends IMessageParams {
    lastId?: number;
}

export async function findMessagesRequest({ answerToId, lastId, authorId, subjectBody }: FindMessagesArguments) {
    const supabase = await createSupabaseClient();
    const user = await getUser({ required: false });

    const supabaseQuery = supabase
        .from('messages')
        .select('*, author:authorId(id, name, avatarUrl), subject:subjectBody, messages(count), likes(userId), favorites(userId)')
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

    if (!data) return [];
    return messageSchema.array().parseAsync(data.map((i) => transformMessage(i, user ? user.id : null)), { path: ['FindMessages'] });
}


export function useFindMessagesRequest({ answerToId, subjectBody, authorId }: IMessageParams) {
    return useInfiniteQuery<IMessage[], Error, InfiniteData<IMessage[]>, FindMessagesQueryKey, number>({
        retry: 1,
        queryKey: ['FIND_MESSAGES', { answerToId, authorId, subjectBody }],
        async queryFn({ pageParam: lastId }) {
            return findMessagesRequest({ answerToId, subjectBody, authorId, lastId });
        },
        getNextPageParam(lastPage) {
            return lastPage.slice().pop()?.id;
        },
        initialPageParam: 0,
    });
}
