import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { MessageProps } from './Message.types';
import MessageAnswerButton from './MessageAnswerButton';
import MessageFavoriteButton from './MessageFavoriteButton';
import MessageHeader from './MessageHeader';
import MessageLikeButton from './MessageLikeButton';
import MessageMenu from './MessageMenu';
import MessageSkeleton from '~/components/MessageSkeleton';
import { useFindMessageRequest } from '~/requests';


const Message: FC<MessageProps> = ({ id, message: initialMessage }) => {
    const { data: message, isLoading } = useFindMessageRequest(id, initialMessage);

    if (!message || isLoading) return <MessageSkeleton />;

    return (
        <Flex
            border="1px"
            borderColor="primary.600"
            borderRadius="lg"
            boxShadow="md"
            data-cy="message"
            flexDirection="column"
            my={4}
        >
            <Flex alignItems="center" p={4} >
                <MessageHeader {...message} />
                <MessageMenu />
            </Flex>
            <Text my={4} p={4} whiteSpace="pre-line">
                {message.body}
            </Text>
            <Flex>
                <MessageFavoriteButton {...message} />
                <MessageLikeButton {...message} />
                <MessageAnswerButton {...message} />
            </Flex>
        </Flex>
    );
};

export default Message;
