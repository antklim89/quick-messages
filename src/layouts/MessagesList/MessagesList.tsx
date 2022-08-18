import { Container } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import MessagesListItem from './MessagesList.Item';
import { MessagesListProps } from './MessagesList.types';
import RouteLoading from '~/components/RouteLoading';
import { findMessagesRequest } from '~/firebase/messageRequests';


const MessagesList: FC<MessagesListProps> = () => {
    const { isLoading, data } = useQuery(['messages_list'], findMessagesRequest);

    if (isLoading || !data) return <RouteLoading />;
    return (
        <Container my={8}>
            {data.map((message) => (
                <MessagesListItem key={message.id} {...message} />
            ))}
        </Container>
    );
};

export default MessagesList;

