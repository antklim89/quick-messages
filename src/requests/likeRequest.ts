import supabase from '~/supabase/app';
import { getUser } from '~/utils';


export async function likeRequest({ messageId }: {messageId: number}) {
    const { id: userId } = await getUser({ errorMessage: 'Login to like message' });

    const { error } = await supabase
        .from('likes')
        .insert({ message: messageId, user: userId });


    if (error) {
        console.error(error.message);
        if (error) throw new Error('Failed to unlike message. Try again later.');
    }
}
