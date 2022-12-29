import { Container } from '@chakra-ui/react';
import { FC } from 'react';
import MessageListCreateNew from './MessageListCreateNew';
import RouteLoading from '~/components/RouteLoading';
import Message from '~/layouts/Message/Message';
import { useFindMessagesRequest } from '~/requests';


const MessagesList: FC = () => {
    const { isLoading, data } = useFindMessagesRequest();

    if (isLoading || !data) return <RouteLoading />;
    return (
        <Container my={8} p={2}>
            <MessageListCreateNew />
            {data.map((message) => (
                <Message key={message.id} {...message} />
            ))}
        </Container>
    );
};

export default MessagesList;

