import { useToast } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { QueryName } from './constants';
import { findMessagesRequest } from '~/requests';
import { messageSchema } from '~/schemas';
import { IMessage } from '~/types/message';
import { getUser, transformMessage } from '~/utils';


export function useFindMessagesRequest({ answerToId }: { answerToId?: number; } = {}) {
    const toast = useToast();

    return useInfiniteQuery<IMessage[], Error>({
        queryKey: [QueryName.FIND_MESSAGES, answerToId],
        async queryFn({ pageParam: lastId }) {
            const user = await getUser({ required: false });
            const data = await findMessagesRequest({ answerToId, lastId });

            return messageSchema.array().parseAsync(data.map((i) => transformMessage(i, user ? user.id : null)));
        },
        getNextPageParam(lastPage) {
            return lastPage.slice().pop()?.id;
        },
        onError(error) {
            toast({ title: error.message, status: 'success' });
        },
    });
}
