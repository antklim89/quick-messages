import supabase from '~/supabase/app';
import { getUser } from '~/utils';


export async function removeFavoriteRequest({ messageId }: {messageId: number}) {
    const { id: userId } = await getUser();

    const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('message', messageId)
        .eq('user', userId);

    if (error) {
        console.error(error.message);
        if (error) throw new Error('Failed to remove favorite message. Try again later.');
    }
}
