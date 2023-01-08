import supabase from '~/supabase/app';
import { getUser } from '~/utils';


export async function createMessageRequest(values: { body: string; }, answerToId: number | undefined) {
    const { id: userId } = await getUser();

    const { error, data } = await supabase
        .from('messages')
        .insert({
            ...values,
            author: userId,
            answerTo: answerToId,
        })
        .select('*, author(*), messages(count), likes(user), favorites(user)')
        .single();

    if (error) {
        console.error(error.message);
        throw new Error('Failed to add new message. Try again later.');
    }

    return data;
}
