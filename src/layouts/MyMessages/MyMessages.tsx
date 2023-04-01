import { Box } from '@chakra-ui/react';
import { last, times } from 'lodash';
import { FC, Fragment } from 'react';
import MessageSkeleton from '~/components/MessageSkeleton';
import { useEndScreenTrigger } from '~/hooks';
import Message from '~/layouts/Message';
import { MESSAGES_LIMIT, useFindMessagesRequest, useUser } from '~/requests';


const MyMessages: FC = () => {
    const { getUserId } = useUser();
    const {
        isLoading,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        data: { pages } = { pages: [] },
    } = useFindMessagesRequest({ authorId: getUserId() });

    useEndScreenTrigger(fetchNextPage, (!isFetching && (last(pages)?.length || 0) >= MESSAGES_LIMIT), 1000);

    return (
        <Box>
            {isLoading
                ? times(10, (i) => (
                    <MessageSkeleton key={i} />
                ))
                : pages.map((messagePages) => (
                    <Fragment key={messagePages[0]?.id || 0}>
                        {messagePages.map((message) => (
                            <Message id={message.id} key={message.id} message={message} />
                        ))}
                    </Fragment>
                ))}
            {isFetchingNextPage
                ? times(10, (i) => (
                    <MessageSkeleton key={i} />
                ))
                : null}
        </Box>
    );
};

export default MyMessages;

