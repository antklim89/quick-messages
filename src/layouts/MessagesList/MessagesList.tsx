import { Container } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { MessagesListProps } from './MessagesList.types';
import MessagesListItem from './MessagesListItem';
import RouteLoading from '~/components/RouteLoading';
import { findMessagesRequest } from '~/requests/messageRequests';


const MessagesList: FC<MessagesListProps> = () => {
    const { isLoading, data } = useQuery(['messages_list'], findMessagesRequest);

    if (isLoading || !data) return <RouteLoading />;
    return (
        <Container my={8} p={2}>
            {data.map((message) => (
                <MessagesListItem key={message.id} {...message} />
            ))}
        </Container>
    );
};

export default MessagesList;

