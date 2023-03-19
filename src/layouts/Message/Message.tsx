import { Flex, MenuItem, Text } from '@chakra-ui/react';
import { FC } from 'react';
import DeleteMessageMenuItem from './DeleteMessageMenuItem';
import { MessageProps } from './Message.types';
import MessageAnswerButton from './MessageAnswerButton';
import MessageHeader from './MessageHeader';
import MessageMenu from './MessageMenu';
import MessageFavoriteButton from '~/components/MessageFavoriteButton';
import MessageLikeButton from '~/components/MessageLikeButton';
import MessageSkeleton from '~/components/MessageSkeleton';
import { useFindMessageRequest } from '~/requests-hooks';


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
            mb={4}
        >
            <Flex alignItems="center" p={4} >
                <MessageHeader {...message} />
                <MessageMenu>
                    <MenuItem>
                        Report
                    </MenuItem>
                    <DeleteMessageMenuItem authorId={message.author.id} messageId={message.id} />
                </MessageMenu>
            </Flex>
            <Text my={4} p={4} whiteSpace="pre-line">
                {message.body}
            </Text>
            <Flex justifyContent="space-around" sx={{ '&>*': { flex: '1 1 0' } }}>
                <MessageFavoriteButton message={message} />
                <MessageLikeButton message={message} />
                <MessageAnswerButton {...message} />
            </Flex>
        </Flex>
    );
};

export default Message;
