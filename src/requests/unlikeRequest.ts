import supabase from '~/supabase/app';
import { getUser } from '~/utils';


export async function unlikeRequest({ messageId }: {messageId: number}) {
    const { id: userId } = await getUser({ errorMessage: 'Login to like message' });

    const { error } = await supabase
        .from('likes')
        .delete()
        .eq('message', messageId)
        .eq('user', userId);

    if (error) {
        console.error(error.message);
        if (error) throw new Error('Failed to like message. Try again later.');
    }
}
