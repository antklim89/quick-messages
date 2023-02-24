import supabase from '~/supabase/app';
import { getUser } from '~/utils';


export async function deleteMessageRequest(messageId: number) {
    const { id: userId } = await getUser();

    const { error, data } = await supabase
        .from('messages')
        .delete()
        .eq('id', messageId)
        .eq('author', userId)
        .single();

    if (error) {
        console.error(error.message);
        throw new Error('Failed to delete message. Try again later.');
    }

    return data;
}
