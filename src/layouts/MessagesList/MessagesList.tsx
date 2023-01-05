import { Container, Skeleton } from '@chakra-ui/react';
import { times } from 'lodash';
import { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import MessageListCreateNew from './MessageListCreateNew';
import MessageSkeleton from '~/components/MessageSkeleton';
import Message from '~/layouts/Message/Message';
import { useFindMessagesRequest } from '~/requests';


const MessagesList: FC = () => {
    const params = useParams();
    const answerToId = z.coerce.number().optional().parse(params.messageId);
    const { isLoading, data } = useFindMessagesRequest({ answerToId });

    return (
        <Container my={8} p={2}>
            {answerToId ? <Message id={answerToId} /> : null}

            <Skeleton isLoaded={!isLoading}>
                <MessageListCreateNew />
            </Skeleton>

            {(isLoading || !data)
                ? times(10, (i) => (
                    <MessageSkeleton key={i} />
                ))
                : data.pages.map((messagePages) => (
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

