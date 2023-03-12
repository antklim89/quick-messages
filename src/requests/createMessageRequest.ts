import supabase from '~/supabase/app';
import { getUser } from '~/utils';


export async function createMessageRequest(values: { body: string; }, answerToId: number | undefined) {
    const { id: userId } = await getUser();

    const { error, data } = await supabase
        .from('messages')
        .insert({
            ...values,
            authorId: userId,
            answerToId,
        })
        .single();

    if (error) {
        console.error(error.message);
        throw new Error('Failed to add new message. Try again later.');
    }

    return data;
}
