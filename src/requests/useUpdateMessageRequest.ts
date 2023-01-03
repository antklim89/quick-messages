import { useMutation } from '@tanstack/react-query';
import supabase from '~/supabase/app';
import { IEditMessageInput } from '~/types/message';



export function useUpdateMessageRequest({ answerToId }: { answerToId?: number; }) {
    return useMutation<void, Error, { messageId: number; body: IEditMessageInput; }>({
        async mutationFn({ body, messageId }) {
            const { data } = await supabase.auth.getSession();
            if (!data.session?.user.id)
                throw new Error('You are not authenticated');

            const { error } = await supabase
                .from('messages')
                .update({ ...body, answerTo: answerToId })
                .eq('id', messageId)
                .select('*, author(*)');

            if (error)
                throw error;
        },
    });
}
