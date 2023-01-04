import { Container } from '@chakra-ui/react';
import { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import MessageListCreateNew from './MessageListCreateNew';
import RouteLoading from '~/components/RouteLoading';
import Message from '~/layouts/Message/Message';
import { useFindMessagesRequest } from '~/requests';


const MessagesList: FC = () => {
    const params = useParams();
    const answerToId = z.coerce.number().optional().parse(params.messageId);
    const { isLoading, data } = useFindMessagesRequest({ answerToId });

    if (isLoading || !data) return <RouteLoading />;
    return (
        <Container my={8} p={2}>
            {answerToId ? <Message id={answerToId} /> : null}
            <MessageListCreateNew />
            {data.pages.map((messagePages) => (
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

