import { IconButton, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { FC, useCallback } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ConfirmDialog from '~/components/ConfirmDialog';
import MessageFavoriteButton from '~/components/MessageFavoriteButton';
import MessageLikeButton from '~/components/MessageLikeButton';
import { useUser, useDeleteMessageRequest } from '~/requests-hooks';
import { IMessage } from '~/types';


const MyMessagesItem: FC<IMessage> = (message) => {
    const { id, body, createdAt, author } = message;
    const { id: userId } = useUser();
    const { mutate, isLoading } = useDeleteMessageRequest({ messageId: id });

    const handleDeleteMessage = useCallback(() => mutate(), []);

    return (
        <>
            <HStack>
                <VStack
                    alignItems="flex-start"
                    as={Link}
                    to={`/message/${id}`}
                    width="100%"
                >
                    <Text fontSize="sm">
                        {new Date(createdAt).toLocaleString()}
                        {author.id === userId ? null : `by ${author.name}`}
                    </Text>
                    <Text mr="auto">
                        {body}
                    </Text>
                </VStack>
                <HStack gap={6} p={4}>
                    <ConfirmDialog
                        isLoading={isLoading}
                        message="Are you sure you want to delete message!"
                        onConfirm={handleDeleteMessage}
                    >
                        {(toggle) => (
                            <IconButton
                                aria-label="delete message"
                                colorScheme="red"
                                isLoading={isLoading}
                                variant="ghost"
                                onClick={toggle}
                            >
                                <FaTrash />
                            </IconButton>
                        )}
                    </ConfirmDialog>

                    <VStack>
                        <MessageLikeButton {...message} />
                        <MessageFavoriteButton {...message} />
                    </VStack>
                </HStack>
            </HStack>
            <Divider />
        </>
    );
};

export default MyMessagesItem;
