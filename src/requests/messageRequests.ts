import { messageSchema } from '~/schemas';
import supabase from '~/supabase/app';
import { IEditMessageInput, IMessage } from '~/types/message';


export async function createMessageRequest(body: IEditMessageInput) {
    const { data } = await supabase.auth.getSession();
    if (!data.session?.user.id) throw new Error('You are not authenticated');

    const { error } = await supabase
        .from('messages')
        .insert({
            ...body,
            author: data.session?.user.id,
        });

    if (error) throw error;
}

export async function updateMessageRequest(messageId: string, body: IEditMessageInput) {
    const { data } = await supabase.auth.getSession();
    if (!data.session?.user.id) throw new Error('You are not authenticated');

    const { error } = await supabase
        .from('messages')
        .update(body)
        .eq('id', messageId);

    if (error) throw error;
}

export async function findMessagesRequest(): Promise<IMessage[]> {
    const { error, data } = await supabase
        .from('messages')
        .select('*, author(*)');

    if (error) throw error;

    const messages = await messageSchema.array().parseAsync(data);

    return messages;
}

