import supabase from '~/supabase/app';
import { IEditMessageInput } from '~/types';
import { getUser } from '~/utils';


interface Arguments {
    messageId: number;
    values: IEditMessageInput;
    answerToId?: number;
}

export async function updateMessageRequest({ values, messageId, answerToId }: Arguments) {
    const { id: userId } = await getUser({ errorMessage: 'Login to like message' });

    const { error } = await supabase
        .from('messages')
        .update({ ...values, answerTo: answerToId })
        .eq('id', messageId)
        .eq('author', userId)
        .select('*, author(*)');


    if (error) {
        console.error(error.message);
        if (error) throw new Error('Failed to update message. Try again later.');
    }
}
