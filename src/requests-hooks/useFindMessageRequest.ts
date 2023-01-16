import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { QueryName } from './constants';
import { findMessageRequest } from '~/requests';
import { messageSchema } from '~/schemas';
import { IMessage } from '~/types/message';
import { getUser, transformMessage } from '~/utils';


export function useFindMessageRequest(messageId: number, initialData?: IMessage) {
    const toast = useToast();

    return useQuery<IMessage, Error>({
        initialData,
        queryKey: [QueryName.FIND_MESSAGE, messageId],
        async queryFn() {
            const user = await getUser({ required: false });
            const data = await findMessageRequest({ messageId });

            return messageSchema.parseAsync(transformMessage(data, user ? user.id : null));
        },
        staleTime: initialData ? Infinity : undefined,
        onError(error) {
            toast({ title: error.message, status: 'error' });
        },
    });
}
