import {
    Card, CardBody, CardFooter, CardHeader, MenuItem, Text,
} from '@chakra-ui/react';
import { FC } from 'react';
import { MessageProps } from './Message.types';
import MessageAnswerButton from './MessageAnswerButton';
import MessageDeleteMenu from './MessageDeleteMenu';
import MessageHeader from './MessageHeader';
import MessageMenu from './MessageMenu';
import MessageUpdateMenu from './MessageUpdateMenu';
import MessageFavoriteButton from '~/components/MessageFavoriteButton';
import MessageLikeButton from '~/components/MessageLikeButton';
import MessageSkeleton from '~/components/MessageSkeleton';
import { useFindMessageRequest } from '~/requests-hooks';


const Message: FC<MessageProps> = ({ id, message: initialMessage, isMain = false }) => {
    const { data: message, isLoading } = useFindMessageRequest(id, initialMessage);

    if (!message || isLoading) return <MessageSkeleton />;
    return (
        <Card
            borderWidth={isMain ? 'medium' : 'thin'}
            boxShadow={isMain ? 'lg' : 'md'}
            mb={4}
        >
            <CardHeader alignItems="center" p={4} >
                <MessageHeader {...message} />
                <MessageMenu>
                    <MenuItem>Report</MenuItem>
                    <MessageDeleteMenu authorId={message.author.id} messageId={message.id} />
                    <MessageUpdateMenu {...message} />
                </MessageMenu>
            </CardHeader>
            <CardBody>
                <Text whiteSpace="pre-line">
                    {message.body}
                </Text>
            </CardBody>
            <CardFooter
                display="flex"
                justifyContent="space-around"
                sx={{ '&>*': { flex: '1 1 0' } }}
            >
                <MessageFavoriteButton message={message} />
                <MessageLikeButton message={message} />
                <MessageAnswerButton {...message} />
            </CardFooter>
        </Card>
    );
};

export default Message;
