import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { MessageProps } from './Message.types';
import MessageAnswerButton from './MessageAnswerButton';
import MessageFavoriteButton from './MessageFavoriteButton';
import MessageLikeButton from './MessageLikeButton';
import MessageMenu from './MessageMenu';
import MessageSkeleton from '~/components/MessageSkeleton';
import { useFindMessageRequest, useUser } from '~/requests';


const Message: FC<MessageProps> = ({ id, message: initialMessage }) => {
    const { data: message, isLoading } = useFindMessageRequest(id, initialMessage);
    const { id: userId } = useUser();

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
                alignItems="center"
                flexDirection={['column', 'row']}
                p={4}
            >
                <Text as={Link} fontSize={['xl', '2xl']} to={`/user/${author.id}`}>{author.id === userId ? 'me' : author.name}</Text>
                <Flex grow={1} />
                <Text fontSize={['xs', 'sm']} mx={4}>{new Date(createdAt).toLocaleString()}</Text>
                <MessageMenu />
            </Flex>
            <Text my={4} p={4}>
                {body}
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
