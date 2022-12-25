import { Container } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import RouteLoading from '~/components/RouteLoading';
import Message from '~/layouts/Message/Message';
import { findMessagesRequest } from '~/requests/messageRequests';


const MessagesList: FC = () => {
    const { isLoading, data } = useQuery(['messages_list'], findMessagesRequest);

    if (isLoading || !data) return <RouteLoading />;
    return (
        <Container my={8} p={2}>
            {data.map((message) => (
                <Message key={message.id} {...message} />
            ))}
        </Container>
    );
};

export default MessagesList;

