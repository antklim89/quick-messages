import { MESSAGES_LIMIT } from './constants';
import supabase from '~/supabase/app';


interface FindMessagesArguments {
    lastId?: number;
    answerToId?: number;
    authorId?: string;
}

export async function findMessagesRequest({ answerToId, lastId, authorId }: FindMessagesArguments) {
    const supabaseQuery = supabase
        .from('messages')
        .select('*, author(*), messages(count), likes(user), favorites(user)')
        .range(0, MESSAGES_LIMIT - 1)
        .order('createdAt', { ascending: false });

    if (lastId) supabaseQuery.lt('id', lastId);
    if (authorId) supabaseQuery.eq('author', authorId);

    if (answerToId) supabaseQuery.eq('answerTo', answerToId);
    else supabaseQuery.is('answerTo', null);

    const { data, error } = await supabaseQuery;


    if (error) {
        console.error(error.message);
        if (error) throw new Error('Failed to load messages. Try again later.');
    }

    return data;
}
