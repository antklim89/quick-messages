import supabase from '~/supabase/app';
import { getUser } from '~/utils';


export async function addFavoriteRequest({ messageId }: {messageId: number}) {
    const { id: userId } = await getUser({ errorMessage: 'Login to add favorite message' });

    const { error } = await supabase
        .from('favorites')
        .insert({ message: messageId, user: userId });

    if (error) {
        console.error(error.message);
        if (error) throw new Error('Failed to add favorite message. Try again later.');
    }
}
