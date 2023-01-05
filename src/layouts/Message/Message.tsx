import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { MessageProps } from './Message.types';
import MessageAnswerButton from './MessageAnswerButton';
import MessageFavoriteButton from './MessageFavoriteButton';
import MessageLikeButton from './MessageLikeButton';
import MessageSkeleton from '~/components/MessageSkeleton';
import { useFindMessageRequest } from '~/requests';


const Message: FC<MessageProps> = ({ id, message: initialMessage }) => {
    const { data: message, isLoading } = useFindMessageRequest(id, initialMessage);

    if (!message || isLoading) return <MessageSkeleton />;

    const { author, body, createdAt } = message;

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
            <Flex
                flexDirection={['column', 'row']}
                justifyContent="space-between"
                p={4}
            >
                <Link to={`/user/${author.id}`}>
                    <Text as="pre" fontSize={['xl', '2xl']} wordBreak="break-all">{author.name}</Text>
                </Link>
                <Text fontSize={['xs', 'sm']}>{new Date(createdAt).toLocaleString()}</Text>
            </Flex>
            <Text my={4} p={4}>
                {body}
            </Text>
            <Flex>
                <MessageFavoriteButton />
                <MessageLikeButton />
                <MessageAnswerButton {...message} />
            </Flex>
        </Flex>
    );
};

export default Message;
