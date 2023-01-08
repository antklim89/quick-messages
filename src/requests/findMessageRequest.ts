import supabase from '~/supabase/app';


export async function findMessageRequest({ messageId }: {messageId: number}) {
    const { data, error } = await supabase
        .from('messages')
        .select('*, author(*), messages(count), likes(user), favorites(user)')
        .eq('id', messageId)
        .single();


    if (error) {
        console.error(error.message);
        if (error) throw new Error('Failed to load message. Try again later.');
    }

    return data;
}
