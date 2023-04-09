import { Card, CardBody, CardFooter, CardHeader, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { MessageProps } from './Message.types';
import MessageAnswerButton from './MessageAnswerButton';
import MessageDeleteMenu from './MessageDeleteMenu';
import MessageHeader from './MessageHeader';
import MessageMenu from './MessageMenu';
import MessageReportMenu from './MessageReportMenu';
import MessageShareMenu from './MessageShareMenu';
import MessageUpdateMenu from './MessageUpdateMenu';
import MessageFavoriteButton from '~/components/MessageFavoriteButton';
import MessageLikeButton from '~/components/MessageLikeButton';
import MessageSkeleton from '~/components/MessageSkeleton';
import { useFindMessageRequest } from '~/requests';


const Message: FC<MessageProps> = ({ id, message: initialMessage, isMain = false }) => {
    const { data: message, isLoading, isError } = useFindMessageRequest(id, initialMessage);

    if (isError) return null;
    if (!message || isLoading) return <MessageSkeleton />;
    return (
        <Card
            borderWidth={isMain ? 'medium' : 'thin'} boxShadow="none" mb={4}
            variant="outline"
        >
            <CardHeader alignItems="start" >
                <MessageHeader {...message} />
                <MessageMenu>
                    <MessageShareMenu {...message} />
                    <MessageReportMenu messageId={message.id} />
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
                p={0}
                pt={2}
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
