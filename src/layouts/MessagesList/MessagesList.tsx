import { Container } from '@chakra-ui/react';
import last from 'lodash/last';
import times from 'lodash/times';
import { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import MessageListCreateNew from './MessageListCreateNew';
import MessageSkeleton from '~/components/MessageSkeleton';
import { useEndScreenTrigger } from '~/hooks';
import Message from '~/layouts/Message/Message';
import { MESSAGES_LIMIT, useFindMessagesRequest } from '~/requests-hooks';


const MessagesList: FC = () => {
    const params = useParams();
    const answerToId = z.coerce.number().optional().parse(params.messageId);
    const authorId = z.coerce.string().optional().parse(params.userId);

    const {
        isLoading,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        data: { pages } = { pages: [] },
    } = useFindMessagesRequest({ answerToId, authorId });

    useEndScreenTrigger(fetchNextPage, (!isFetching && (last(pages)?.length || 0) >= MESSAGES_LIMIT), 1000);

    return (
        <Container my={8} p={2}>
            {answerToId ? <Message id={answerToId} /> : null}

            {authorId ? null : <MessageListCreateNew isLoading={isLoading} /> }

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
        </Container>
    );
};

export default MessagesList;

