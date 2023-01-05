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
import { useFindMessagesRequest } from '~/requests';
import { MESSAGES_LIMIT } from '~/requests/constants';


const MessagesList: FC = () => {
    const params = useParams();
    const answerToId = z.coerce.number().optional().parse(params.messageId);
    const {
        isLoading,
        isFetching,
        fetchNextPage,
        data: { pages } = { pages: [] },
    } = useFindMessagesRequest({ answerToId });

    useEndScreenTrigger(fetchNextPage, (!isFetching && (last(pages)?.length || 0) >= MESSAGES_LIMIT));

    return (
        <Container my={8} p={2}>
            {answerToId ? <Message id={answerToId} /> : null}

            <MessageListCreateNew isLoading={isLoading} />

            {(isLoading)
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
        </Container>
    );
};

export default MessagesList;

